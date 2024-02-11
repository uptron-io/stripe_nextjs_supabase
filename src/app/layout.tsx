'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const options:StripeElementsOptions = {
    mode: "payment",
    amount: 1000,
    currency: 'eur',
    appearance: {
      theme: "stripe",
    },
  };

  const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

  return (
    <Elements stripe={stripe} options={options}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Elements>
  );
}
