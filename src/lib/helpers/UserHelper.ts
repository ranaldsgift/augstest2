import { supabaseClient } from "$lib/db";

export class UserHelper {
    public static async signIn(email: string, redirectTo?: string) {
        try {
            const { error } = await supabaseClient.auth.signInWithOtp({ email, 
                options: {
                    emailRedirectTo: redirectTo ?? undefined
                }
            });
            if (error) throw error
            return { error: null };
        } catch (error) {
            return { error: error };
        }
    }

    public static async signOut() {
        try {
            const { error } = await supabaseClient.auth.signOut();
            if (error) throw error
            return { error: null };
        } catch (error) {
            return { error: error };
        }
    }
}