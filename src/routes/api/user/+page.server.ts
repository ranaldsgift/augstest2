
import { UserHelper } from "$lib/helpers/UserHelper";
import type { Actions } from "./$types";
import { fail, error } from '@sveltejs/kit';
import { FormHelper } from "$lib/helpers/FormHelper";
import { User } from "$lib/entities/User";

export const actions: Actions = {
    login: async ({ request, url, locals }) => {
        const formData = await request.formData();
        const email = formData.get('email');

        if (!email) {
			return fail(400, { email, missing: true });
        }
        
        const response = await UserHelper.signIn(email.toString(), url.searchParams.get('redirectTo') ?? undefined);

        if (response.error) {
            console.log(response.error);
            throw error(500, "Internal Server Error");
        }

        return { id: locals.session?.user.id };
    },

    save: async ({ request, locals }) => {
        if (!locals.session) {
            throw error(401, "Unauthorized");
        }

        const formData = await request.formData();
        const user = FormHelper.deserializeFormData<User>(User, formData);

        if (!user || locals.session.user.id !== user.id) {
            throw error(401, "Unauthorized");
        }

        try {
            await user.save({ data: { session: locals.session } });
        }
        catch (err) {
            console.error(err);
            throw error(500, "Internal Server Error");
        }

        return { id: user?.id };
    }
};