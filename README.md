# EF Auto Cleaning

Interactive marketing and booking site for EF Auto Cleaning, a mobile interior car cleaning service in Mulhouse and the surrounding 30 km area.

The site presents the company’s offers, subscription plan, referral program, gallery-style results section, appointment request form, and a lightweight admin panel for reviewing submitted requests during a browser session.

## Tech Stack

- TanStack Start
- React 19
- TanStack Router
- TypeScript
- Vite
- Tailwind CSS 4
- Lucide React icons
- Netlify deployment

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app runs on the Vite dev server, usually at `http://localhost:3000`.

For Netlify feature emulation, use the Netlify CLI dev server:

```bash
/opt/buildhome/node-deps/node_modules/.bin/netlify dev
```

## Project Structure

- `src/routes/index.tsx` - main EF Auto Cleaning single-page experience.
- `src/routes/__root.tsx` - document shell and SEO metadata.
- `src/styles.css` - global styling and responsive design.
- `netlify.toml` - Netlify build and development configuration.

## Notes

The current booking, subscription, referral, and admin interactions are client-side and session-local. Add Netlify Database before storing production appointment or customer data persistently.
