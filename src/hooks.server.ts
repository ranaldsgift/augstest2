import 'reflect-metadata';
import { redirect, type Handle } from '@sveltejs/kit';
import { AppDataSource } from '$lib/server/db/DataSource';
import { User } from '$lib/entities/User';
import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const handle: Handle = async ({event, resolve}) => {
	event.locals.supabaseClient = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
		  get: (key) => event.cookies.get(key),
		  /**
		   * Note: You have to add the `path` variable to the
		   * set and remove method due to sveltekit's cookie API
		   * requiring this to be set, setting the path to an empty string
		   * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
		   */
		  set: (key, value, options) => {
			event.cookies.set(key, value, { ...options, path: '/' })
		  },
		  remove: (key, options) => {
			event.cookies.delete(key, { ...options, path: '/' })
		  },
		},
	  })
	
	  /**
	   * a little helper that is written for convenience so that instead
	   * of calling `const { data: { session } } = await supabase.auth.getSession()`
	   * you just call this `await getSession()`
	   */
	event.locals.getSession = async () => {
		const {
			data: { session },
		  } = await event.locals.supabaseClient.auth.getSession()
		  return session
	};

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const session = await event.locals.getSession();
 	if (session) {
		event.locals.user = await User.findOne({ where: { id: session.user.id }, relations: { homebrewFavorites: true } });
	}

	if (event.url.pathname.endsWith('/edit')) {
		if (!session) {
			redirect(303, '/errors/auth');
		}
		
		if (!event.locals.user?.userName || event.locals.user.userName.length === 0) {
			if (!event.url.pathname.startsWith('/user/'))
				redirect(303, '/errors/profile');
		}
	}
	
	const response = await resolve(event);
	return response;
}