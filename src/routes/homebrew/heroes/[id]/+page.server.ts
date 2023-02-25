import { Hero } from '$lib/entities/Hero';
import { DataHelper } from '$lib/helpers/DataHelper';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {

    const id = Number(params.id);

    if (isNaN(id)) {
        throw error(404, 'You must provide a Hero ID');
    }

    if (id === 0) {
        throw error(404, 'You must provide a valid Hero ID');
    }

    const loadData = async () => {    
        let hero = null;
        try {
            hero = await Hero.findOne({
                relations: { skillCards: true },
                where: { id: id },
                order: { abilities: { id: 'ASC' } }
            });
        }
        catch (err) {
            console.log(err);
            throw error(500, "Internal Server Error");
        }

        if (!hero || (hero.isDeleted && hero.user.id !== locals.session?.user.id)) {
            throw error(404, 'Hero not found');
        }

        if (hero.isDeleted && locals.session && hero.user.id !== locals.session.user.id) {
            throw error(404, 'Hero not found');                
        }
        
        return Promise.resolve(DataHelper.serialize(hero));
    }
  
    return {
        authUser: locals.user ? DataHelper.serialize(locals.user) : undefined,
        heroModel: loadData()
    };
}