import { Hero } from '$lib/entities/Hero';
import { DataHelper } from '$lib/helpers/DataHelper';
import { error } from '@sveltejs/kit';
import { instanceToPlain } from 'class-transformer';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
    const loadData = async () => {
        let heroList: {}[] = [];

        try {
            heroList = await Hero.find();
        }
        catch(err) {
            console.log(err);
            error(500, 'Error loading Hero data.');
        }

        return Promise.resolve(DataHelper.serialize(heroList));
    }

    return {
        jsonList: loadData()
    };
}