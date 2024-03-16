import { Hero } from '$lib/entities/Hero';
import { DataHelper } from '$lib/helpers/DataHelper';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
    const id = Number(params.id);

    if (isNaN(id)) {
        error(404, 'You must provide a Hero ID');
    }

    if (id === 0) {
        error(404, 'You must provide a valid Hero ID');
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
            error(500, "Internal Server Error");
        }

        const session = await locals.getSession();
        if (!hero || (hero.isDeleted && hero.user.id !== session?.user.id)) {
            error(404, 'Hero not found');
        }

        if (hero.isDeleted && session && hero.user.id !== session.user.id) {
            error(404, 'Hero not found');                
        }
        
        return Promise.resolve(DataHelper.serialize(hero));
    }
  
    return {
        authUser: locals.user ? DataHelper.serialize(locals.user) : undefined,
        heroModel: await loadData()
    };
}