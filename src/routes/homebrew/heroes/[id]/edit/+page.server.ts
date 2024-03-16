import { Hero } from '$lib/entities/Hero';
import { DataHelper } from '$lib/helpers/DataHelper';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {

    if (isNaN(parseInt(params.id))) {
        error(404, 'You must provide a Hero ID');
    }

    let id = parseInt(params.id) ?? 0;

    if (!id) {
        error(404, 'You must provide a valid Hero ID');
    }
    
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

    if (!hero) {
        error(404, 'Hero not found');
    }
    
    return {
        heroModel: DataHelper.serialize(hero)
    };
}