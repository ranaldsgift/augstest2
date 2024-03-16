
import type { Actions } from "./$types";
import { FormHelper } from "$lib/helpers/FormHelper";
import { redirect, error } from "@sveltejs/kit";
import { DataHelper } from "$lib/helpers/DataHelper";
import { Villain } from "$lib/entities/Villain";

export const actions: Actions = {
    save: async ({ request, locals }) => {
        const session = await locals.getSession();

        if (!session) {
            redirect(303, '/errors/auth');
        }

        const formData = await request.formData();
        const villain = FormHelper.deserializeFormData<Villain>(Villain, formData);
        
        if (!villain || !villain.user || session.user.id !== villain.user.id) {
            error(401, "Unauthorized");
        }

        try {
            await villain.save({ data: { session: session } });      
        }
        catch (err: any) {
            console.error(err.message);
            error(500, err.message);
        }
        
        return { villain: DataHelper.serialize(villain) };
    }
};