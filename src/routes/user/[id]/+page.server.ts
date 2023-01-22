import { User } from '$lib/entities/User';
import { DataHelper } from '$lib/helpers/DataHelper';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {

    if (!params.id) {
        throw error(404, "You must supply an ID for a User");
    }

    let user: User | null;

    try {
        user = await User.findOneBy({ id: params.id });
    }
    catch (err) {
        console.log(err);
        throw error(500, "Internal Server Error");
    }

    if (!user) {
        throw error(404, "User not found");
    }

    return {
        json: DataHelper.serialize(user)
    };
}