# Stripe + Supabase = Everything you need to know

## Overview
Seamless Integration: Mastering Stripe Payments in Your Next.js Web Application with Supabase Backend.

Бесшовная интеграция: освоение Stripe Payments в вашем веб-приложении Next.js с помощью Supabase Backend.

## Supabase
Go to [Supabase](https://supabase.com)

Command:
```cmd
supabase init
supabase link --project-ref [your_project_id_here]

supabase secrets list
supabase secrets set STRIPE_SECRET_KEY=[YOUR_STRIPE_SECRET_KEY]
supabase secrets set STRIPE_WEBHOOK_SIGNING_SECRET=[YOUR_STRIPE_WEBHOOK_SIGNING_SECRET]

supabase functions new stripe_webhooks
supabase functions new create_payment_intent

supabase functions deploy create_payment_intent
supabase functions deploy stripe_webhooks --no-verify-jwt
```

## Stripe
Go to [Stripe](https://stripe.com)

## NextJS

Create a new application
```cmd
npx create-next-app@latest
```

## Contributing
Contributions to enhance the functionality or efficiency of this code are welcome. 
Please submit a pull request for review.

## License
MIT

## Support
For support, please open an issue in the GitHub repository or contact the repository owner directly.

## Disclaimer
This code is provided as-is with no warranty. Users should ensure they have the proper permissions to interact with Google Sheets API and handle user data responsibly.

