import { Villain } from '$lib/entities/Villain';
import { DataHelper } from '$lib/helpers/DataHelper';
import type { PageLoad } from './$types';

export const load = (async ({ data }) => {    
    let villain = DataHelper.deserialize(Villain, data.villain);
    return { villain: villain };
}) satisfies PageLoad;