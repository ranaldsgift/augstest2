import type { PageServerLoad } from './$types';
import { Hero } from '$lib/entities/Hero';
import { DataHelper } from '$lib/helpers/DataHelper';

export const load: PageServerLoad = async ({ locals, params }) => {  
    const hero = new Hero();
    if (locals.user) {
        hero.user = locals.user;
    }
    
    return {
        hero: DataHelper.serialize(hero)
    };
}