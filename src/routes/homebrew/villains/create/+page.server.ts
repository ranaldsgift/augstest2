import { Villain } from '$lib/entities/Villain';
import { DataHelper } from '$lib/helpers/DataHelper';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const villain = new Villain();
    if (locals.user) {
        villain.user = locals.user;
    }
    
    return {
        villain: DataHelper.serialize(villain)
    };
}) satisfies PageServerLoad;