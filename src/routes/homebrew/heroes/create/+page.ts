import { Hero } from '$lib/entities/Hero';
import { DataHelper } from '$lib/helpers/DataHelper';
import type { PageLoad } from './$types';

export const load = (async ({ data }) => {
    
    let hero = DataHelper.deserialize(Hero, data.hero);
    return { hero: hero };
}) satisfies PageLoad;