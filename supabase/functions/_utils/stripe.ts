import { Stripe } from "https://esm.sh/stripe@14.15.0?target=deno";

export const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: "2023-10-16",
});

export const createPaymentIntent = async (userId: string, amount: number) => {
  const { client_secret } = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "eur",
    description: "Test payment",
    metadata: { "userId": userId, "amount": amount },
  });

  return client_secret as string;
}

export const cryptoProvider = Stripe.createSubtleCryptoProvider();