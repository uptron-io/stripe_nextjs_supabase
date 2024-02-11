import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createPaymentIntent } from "../_utils/stripe.ts";
import { getSupabaseByUser } from "../_utils/supabase.ts";

serve(async (req) => {
  const authToken = req.headers.get("Authorization");

  try {
    const supabase = getSupabaseByUser(authToken!);
    const userData = await supabase.auth.getUser();

    const customerId = await createPaymentIntent(userData.data.user?.id!, 5);
    console.log('Customer Id: ' + customerId);

    return new Response(JSON.stringify(customerId), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        "Content-type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 400 });
  }
})
