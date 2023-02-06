import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';

export const load: LayoutServerLoad = async (event) => {
	let theme = event.cookies.get('theme');
	// If no theme, set theme to skeleton
	if (!theme) {
		event.cookies.set('theme', 'default', { path: '/' });
		theme = 'default';
	}
	// Imports theme as a string
	const modules = import.meta.glob(`$lib/themes/*.css`, { as: 'raw' });
	const themeCss = await modules[`/src/lib/themes/theme-${theme}.css`]();
	return { 
		session: await getServerSession(event),
		currentTheme: themeCss
	};
};