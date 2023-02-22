import { SkillCard } from '$lib/entities/SkillCard';
import { DataHelper } from '$lib/helpers/DataHelper';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const skillCard = new SkillCard();
    if (locals.user) {
        skillCard.user = locals.user;
    }
    
    return {
        skillCard: DataHelper.serialize(skillCard)
    };
}) satisfies PageServerLoad;