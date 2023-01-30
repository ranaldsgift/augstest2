// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// and what to do when importing types
declare namespace App {
	interface Supabase {
	  Database: import('./schema').Database
	  SchemaName: 'public'
	}
	interface Locals {
    	session: import('@supabase/supabase-js').Session | null
    	supabaseClient: import('@supabase/auth-helpers-sveltekit').TypedSupabaseClient | null
		user: import('$lib/entities/User').User | null
	}
	interface PageData {
    	session: import('@supabase/supabase-js').Session | null
	}
	// interface Error {}
	// interface Platform {}
}
