import {
    useElements,
    useStripe,
    PaymentElement
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { createClient } from "../utils/supabase/client";

export const CheckoutForm = () => {
    const elements = useElements()
    const router = useRouter()
    const stripe = useStripe()

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event:any) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        const {error: submitError} = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message!);
            return;
        }

        const supabase = createClient();
        const { data } = await supabase.functions.invoke('create_payment_intent');

        const { error } = await stripe!.confirmPayment({
            clientSecret: data,
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/content",
            },
        })

        router.push('/content')
    };

    return (
        <form
            className="p-10 bg-[#94a3b8]"
            onSubmit={handleSubmit}
        >
            <PaymentElement />
            <div className="flex mt-10">
                <button
                    className="h-10 px-6 py-2 m-auto font-semibold rounded-md bg-black text-white"
                    type="submit"
                    disabled={!stripe || !elements}
                >
                    Pay
                </button>
            </div>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
}