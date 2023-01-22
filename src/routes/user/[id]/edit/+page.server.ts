
import { User } from '$lib/entities/User';
import { DataHelper } from '$lib/helpers/DataHelper';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
    const user = await User.findOneBy({ id: params.id });

    return {
        json: DataHelper.serialize(user)
    };
}