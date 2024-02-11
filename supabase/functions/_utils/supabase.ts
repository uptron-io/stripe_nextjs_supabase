import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

export const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

export function getSupabaseByUser(token: string) {
    return createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: token },
        },
      },
    );
  }

export const activatePremium = async (userId: string) => {
    await supabaseAdmin.from('profiles').update({paid: true}).eq('id', userId);
}