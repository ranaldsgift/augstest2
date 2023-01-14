import { User } from '$lib/entities/User';
import { error, redirect } from '@sveltejs/kit';
import { instanceToPlain } from 'class-transformer';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {

    if (!params.id) {
        console.log('no id');
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
        json: JSON.stringify(instanceToPlain(user))
    };
}