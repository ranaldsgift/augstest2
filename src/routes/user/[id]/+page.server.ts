import { User } from '$lib/entities/User';
import { DataHelper } from '$lib/helpers/DataHelper';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {

    if (!params.id) {
        error(404, "You must supply an ID for a User");
    }

    let user: User | null;

    try {
        user = await User.findOne({
            relations: { homebrewFavorites: { homebrew: true } },
            where: {id: params.id } 
        });
    }
    catch (err) {
        console.log(err);
        error(500, "Internal Server Error");
    }

    if (!user) {
        error(404, "User not found");
    }

    return {
        json: DataHelper.serialize(user),
    };
}