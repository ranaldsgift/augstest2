import { Hero } from '$lib/entities/Hero';
import { DataHelper } from '$lib/helpers/DataHelper';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {

    if (isNaN(parseInt(params.id))) {
        throw error(404, 'You must provide a Hero ID');
    }

    let id = parseInt(params.id) ?? 0;

    if (!id) {
        throw error(404, 'You must provide a valid Hero ID');
    }

      
    let hero = null;
    try {
        hero = await Hero.findOneBy({ id: id });
    }
    catch (err) {
        console.log(err);
        throw error(500, "Internal Server Error");
    }
  
    return {
        heroModel: DataHelper.serialize(hero)
    };
}