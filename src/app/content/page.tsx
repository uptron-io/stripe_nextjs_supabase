"use client";
import Player from "react-player";
import { createClient } from "../utils/supabase/client";
import useSWR from "swr";

export default function Page() {
  
  const getPremiumContent = async () => {
    const supabase = createClient();
    const userData = await supabase.auth.getUser();

    const { data, error } = await supabase.from('profiles').select('*').eq('id', userData.data.user?.id).single();

    if(data)
    {
      console.log(data.id);
    }

    return data;
  };

  const { data: premium, error, isLoading } = useSWR('/get_premium', getPremiumContent);

  if (error) {
    return <div>Error loading data</div>;
  }

  if(isLoading)
  {
    return <div>Loading ...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-4xl font-extrabold">Premium content</div>

      <div className="mt-16 w-full">
        {premium ? (
          <div>
            <h1 className="font-extrabold text-xl tracking-tight mb-4">{premium.description}</h1>
            <Player
              url={premium.url}
              width="100%"
            />
          </div>
          ) : null
        }
      </div>
    </main>
  );
}
