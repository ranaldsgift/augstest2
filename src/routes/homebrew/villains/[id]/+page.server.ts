import { Villain } from '$lib/entities/Villain';
import { DataHelper } from '$lib/helpers/DataHelper';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {

    const id = Number(params.id);

    if (isNaN(id)) {
        error(404, 'You must provide a Villain ID');
    }

    if (id === 0) {
        error(404, 'You must provide a valid Villain ID');
    }

    const loadData = async () => {    
        let villain = null;
        try {
            villain = await Villain.findOne({
                where: { id: id }
            });
        }
        catch (err) {
            console.log(err);
            error(500, "Internal Server Error");
        }

        const session = await locals.getSession();
        if (!villain || (villain.isDeleted && villain.user.id !== session?.user.id)) {
            error(404, 'Villain not found');
        }
        
        return Promise.resolve(DataHelper.serialize(villain));
    }
  
    return {
        authUser: locals.user ? DataHelper.serialize(locals.user) : undefined,
        villainJSON: await loadData()
    };
}