# To-Dooz

A simple to-do app

This is a simple implementation of a typical authentication flow using [React19](react.dev) [Next.js](https://nextjs.org/), [BetterAuth](https://www.better-auth.com/), [Prisma](https://www.prisma.io/) ORM and [Postgresql](https://www.postgresql.org/).

## Currently Deployed on [Vercel](https://login-auth-wheat.vercel.app/)

## Things yet to be implemented

- Email Verification flow.
  - Sending verificatin links.
- Configure JWT tokens
- Signing in with Google.
- The to-do functionality afte loging in.

## For local development

You need nodejs version 18 or up

1. Install all the necessary packages:

   ```bash
   npm install
   # or
   npm i
   ```

2. Add neccessary .env secrets

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
