import type { PageServerLoad } from './$types';
import { redirect, type Handle } from '@sveltejs/kit';
import { Hero } from '$lib/entities/Hero';
import { DataHelper } from '$lib/helpers/DataHelper';

export const load: PageServerLoad = async ({ locals, params }) => {
    if (!locals.session) { 
        throw redirect(303, '/errors/auth');
    }
  
    const hero = new Hero(locals.session.user.id);
    
    return {
        hero: DataHelper.serialize(hero)
    };
}