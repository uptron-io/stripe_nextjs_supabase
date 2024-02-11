"use client";
import { CheckoutForm } from "../components/CheckoutForm";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-4xl font-extrabold">Payment</div>
      <p className="mt-4">Amount: 5$</p>

      <div className="mb-4 mt-4">
        <CheckoutForm />
      </div>
    </main>
  );
}
