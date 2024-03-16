import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import type { LayoutLoad } from './$types';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'
import { browser } from '$app/environment';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
    depends('supabase:auth')
  
    const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
      global: {
        fetch,
      },
      cookies: {
        get(key) {
          if (!isBrowser()) {
            return JSON.stringify(data.session)
          }
  
          const cookie = parse(document.cookie)
          return cookie[key]
        },
      },
    })
  
    const {
      data: { session },
    } = await supabase.auth.getSession()

    let breadcrumbClass = "breadcrumb-nonresponsive";
    if (browser && window.innerWidth < 550) {
        breadcrumbClass = "breadcrumb";
    }

    return { 
        supabase, 
        currentTheme: data.currentTheme,
        breadcrumbClass,
        session 
    }
  }

/* export const load: LayoutLoad = async (event) => {
    console.log('layout load');
    const { session } = await event.locals.getSupabase(event);

    let breadcrumbClass = "breadcrumb-nonresponsive";
    if (browser && window.innerWidth < 550) {
        breadcrumbClass = "breadcrumb";
    }

    return {
        session,
        currentTheme: event.data.currentTheme,
        breadcrumbClass
    };
}; */