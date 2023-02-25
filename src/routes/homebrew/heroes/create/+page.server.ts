import { Hero } from '$lib/entities/Hero';
import { DataHelper } from '$lib/helpers/DataHelper';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const hero = new Hero();
    if (locals.user) {
        hero.user = locals.user;
    }
    
    return {
        hero: DataHelper.serialize(hero)
    };
}) satisfies PageServerLoad;