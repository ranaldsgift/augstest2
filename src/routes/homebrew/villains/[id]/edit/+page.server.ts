import { Villain } from '$lib/entities/Villain';
import { DataHelper } from '$lib/helpers/DataHelper';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    if (isNaN(parseInt(params.id))) {
        throw error(404, 'You must provide a Villain ID');
    }

    let id = parseInt(params.id) ?? 0;

    if (!id) {
        throw error(404, 'You must provide a valid Villain ID');
    }
    
    let villain = null;
    try {
        villain = await Villain.findOne({
            where: { id: id }
        });
    }
    catch (err) {
        console.log(err);
        throw error(500, "Internal Server Error");
    }

    if (!villain) {
        throw error(404, 'Hero not found');
    }
    
    return {
        json: DataHelper.serialize(villain)
    };
}) satisfies PageServerLoad;