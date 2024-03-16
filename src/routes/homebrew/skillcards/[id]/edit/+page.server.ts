import { SkillCard } from '$lib/entities/SkillCard';
import { DataHelper } from '$lib/helpers/DataHelper';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    if (isNaN(parseInt(params.id))) {
        error(404, 'You must provide a Skill Card ID');
    }

    let id = parseInt(params.id) ?? 0;

    if (!id) {
        error(404, 'You must provide a valid Skill Card ID');
    }
    
    let skillCard = null;
    try {
        skillCard = await SkillCard.findOne({
            relations: { hero: true },
            where: { id: id }
        });
    }
    catch (err) {
        console.log(err);
        error(500, "Internal Server Error");
    }

    if (!skillCard) {
        error(404, 'Hero not found');
    }
    
    return {
        json: DataHelper.serialize(skillCard)
    };
}) satisfies PageServerLoad;