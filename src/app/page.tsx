'use client';

import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import { createClient } from "./utils/supabase/client";

export default function Home() {  
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <form action={dispatch} className="space-y-3">
          <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
            <h1 className={"mb-3 text-2xl"}>Please log in to continue.</h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 text-black"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 text-black"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 disabled:opacity-75">
                Log in
              </button>
            </div>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

async function authenticate(prevState: string | undefined, formData: FormData) {
  const supabase = createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return redirect(`/payment`);
}
