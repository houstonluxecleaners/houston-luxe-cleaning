# Houston Luxe Cleaning — Launch Ready

## What is included
- Vite + React app
- Tailwind CSS setup
- Your current website code
- Logo placed in `public/logo.png`
- Booking form with service/date/time selection
- Success banner support via `?booking=success`

## 1) Run locally
```bash
npm install
npm run dev
```

## 2) Replace Stripe links
Open `src/App.jsx` and replace every `https://buy.stripe.com/replace_...` value with your real Stripe payment links.

## 3) Stripe redirect settings
For each Stripe payment link:
- Success URL: `https://yourdomain.com/?booking=success`
- Cancel URL: `https://yourdomain.com/?booking=cancelled`

## 4) Deploy to Vercel
- Push this folder to GitHub
- Import the repo into Vercel
- Deploy
- Add your custom domain in Vercel settings

## 5) SMS / email automation
Use Zapier:
- Trigger: Stripe payment succeeded
- Actions:
  - Gmail or email provider -> send booking confirmation email
  - Twilio -> send booking confirmation text
  - Optional: create a Jobber job

## 6) Important note
The booking form passes booking details into the checkout URL as query params for now. For a production-grade Stripe + automation setup, the ideal next step is using a serverless function or Stripe metadata/webhooks.

## Files you will care about
- `src/App.jsx` -> main website
- `public/logo.png` -> your logo
- `src/index.css` -> base styles
