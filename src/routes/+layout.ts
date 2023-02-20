import type { LayoutLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { browser } from '$app/environment';

export const load: LayoutLoad = async (event) => {
    const { session } = await getSupabase(event);

    let breadcrumbClass = "breadcrumb-nonresponsive";
    if (browser && window.innerWidth < 550) {
        breadcrumbClass = "breadcrumb";
    }

    return {
        session,
        currentTheme: event.data.currentTheme,
        breadcrumbClass
    };
};