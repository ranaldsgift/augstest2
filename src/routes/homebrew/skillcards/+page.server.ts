import { SkillCard } from '$lib/entities/SkillCard';
import { DataHelper } from '$lib/helpers/DataHelper';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    const loadData = async () => {
        let skillCardList: SkillCard[] = [];

        try {
            skillCardList = await SkillCard.find({ relations: { hero: true }});
        }
        catch(err) {
            console.log(err);
            error(500, 'Error loading Hero data.');
        }

        return Promise.resolve(DataHelper.serialize(skillCardList));
    }

    return {
        jsonList: loadData()
    };
}) satisfies PageServerLoad;