
import type { Actions } from "./$types";
import { FormHelper } from "$lib/helpers/FormHelper";
import { Hero } from "$lib/entities/Hero";
import { redirect, error } from "@sveltejs/kit";
import { DataHelper } from "$lib/helpers/DataHelper";

export const actions: Actions = {
    save: async ({ request, locals }) => {
        if (!locals.session) {
            throw redirect(303, '/errors/auth');
        }

        const formData = await request.formData();
        const hero = FormHelper.deserializeFormData<Hero>(Hero, formData);
        
        if (!hero || !hero.user || locals.session.user.id !== hero.user.id) {
            throw error(401, "Unauthorized");
        }

        try {
            await hero.save({ data: { session: locals.session } });      
        }
        catch (err: any) {
            console.error(err.message);
            throw error(500, err.message);
        }
        
        return { hero: DataHelper.serialize(hero) };
    }
};