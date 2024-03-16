import { Hero } from '$lib/entities/Hero';
import { SkillCard } from '$lib/entities/SkillCard';
import { DataHelper } from '$lib/helpers/DataHelper';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {

    const id = Number(params.id);

    if (isNaN(id)) {
        error(404, 'You must provide a Skill Card ID');
    }

    if (id === 0) {
        error(404, 'You must provide a valid Skill Card ID');
    }

    const loadData = async () => {    
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

        const session = await locals.getSession();
        if (!skillCard || (skillCard.isDeleted && skillCard.user.id !== session?.user.id)) {
            error(404, 'Skill Card not found');
        }

        if (skillCard.isDeleted && session && skillCard.user.id !== session.user.id) {
            error(404, 'Skill Card not found');                
        }
        
        return Promise.resolve(DataHelper.serialize(skillCard));
    }
  
    return {
        authUser: locals.user ? DataHelper.serialize(locals.user) : undefined,
        skillCardJSON: await loadData()
    };
}