import { Hero } from '$lib/entities/Hero';
import { DataHelper } from '$lib/helpers/DataHelper';
import { error, redirect } from '@sveltejs/kit';
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
            hero = await Hero.findOneBy({ id: id });
        }
        catch (err) {
            console.log(err);
            throw error(500, "Internal Server Error");
        }
        return Promise.resolve(DataHelper.serialize(hero));
    }
  
    return {
        heroModel: loadData()
    };
}