
import type { Actions } from "./$types";
import { FormHelper } from "$lib/helpers/FormHelper";
import { redirect, error } from "@sveltejs/kit";
import { SkillCard } from "$lib/entities/SkillCard";
import { DataHelper } from "$lib/helpers/DataHelper";

export const actions: Actions = {
    save: async ({ request, locals }) => {
        const session = await locals.getSession();

        if (!session) {
            redirect(303, '/errors/auth');
        }

        const formData = await request.formData();
        const skillCard = FormHelper.deserializeFormData<SkillCard>(SkillCard, formData);
        
        if (!skillCard || !skillCard.user || session.user.id !== skillCard.user.id) {
            error(401, "Unauthorized");
        }

        try {
            await skillCard.save({ data: { session: session } });      
        }
        catch (err: any) {
            console.error(err.message);
            error(500, err.message);
        }  
        
        return { id: skillCard?.id };
    },
    load: async ({ request, locals }) => {
        let data = null;
        try {
            data = await SkillCard.find();
        }
        catch (err) {
            console.error(err);
            error(500, "Internal Server Error");
        }
    
        const jsonData = DataHelper.serialize(data);        
        return new Response(jsonData);
    }
};