import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.getSession();
    if (!session) {
        redirect(303, '/errors/auth');
    }

    return {
        userId: session.user?.id
    };
}