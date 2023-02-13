
import type { Actions } from "./$types";
import { FormHelper } from "$lib/helpers/FormHelper";
import { redirect, error } from "@sveltejs/kit";
import { SkillCard } from "$lib/entities/SkillCard";

export const actions: Actions = {
    save: async ({ request, locals }) => {
        if (!locals.session) {
            throw redirect(303, '/errors/auth');
        }

        const formData = await request.formData();
        const skillCard = FormHelper.deserializeFormData<SkillCard>(SkillCard, formData);
        
        if (!skillCard || !skillCard.user || locals.session.user.id !== skillCard.user.id) {
            throw error(401, "Unauthorized");
        }

        try {
            await skillCard.save({ data: { session: locals.session } });      
        }
        catch (err: any) {
            console.error(err.message);
            throw error(500, err.message);
        }  
        
        return { id: skillCard?.id };
    }
};