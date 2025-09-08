# Accessaurus Setup Guide

## Prerequisites

- Node.js 18+ or Bun
- Clerk account (for authentication)
- Sanity account (for blog/CMS on landing page)

## Quick Setup

### 1. Install Dependencies

```bash
# Install all dependencies using Bun (recommended) or npm
bun install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` in the root directory:

```bash
cp .env.example .env
```

### 3. Configure Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application or use existing one
3. Enable "Organizations" feature in Organization Settings
4. Copy your API keys to `.env`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

### 4. Configure Sanity CMS (for Landing Page Blog)

Run this command from the landing app directory:

```bash
cd apps/landing
npm create sanity@latest -- --env=../../.env --create-project "Accessaurus Blog" --dataset production
```

This will:
- Create a new Sanity project
- Add the project ID and dataset to your `.env` file
- Set up the blog CMS

Optional: Import demo blog data:
```bash
npx sanity@latest dataset import seed.tar.gz
```

### 5. Start Development Servers

Run both apps in development mode:

```bash
# Terminal 1 - Dashboard App (port 3000)
cd apps/app && bun dev

# Terminal 2 - Landing Page (port 3100)
cd apps/landing && bun dev
```

Visit:
- Landing page: http://localhost:3100
- Dashboard app: http://localhost:3000
- Sanity Studio: http://localhost:3100/studio

## Project Structure

```
accessaurus/
├── apps/
│   ├── app/          # Dashboard application (port 3000)
│   ├── landing/      # Marketing landing page (port 3100)
│   └── adr/          # Architecture decision records
├── packages/
│   └── assets/       # Shared assets (logo, images)
└── .env              # Environment variables (create from .env.example)
```

## Build for Production

Both apps must build successfully:

```bash
# Build dashboard app
cd apps/app && bun run build

# Build landing page
cd apps/landing && bun run build
```

## Production Deployment

The apps are configured to work with these production domains:
- Landing: `https://www.accessaurus.com`
- Dashboard: `https://app.accessaurus.com`

You can override these with environment variables:
- `NEXT_PUBLIC_LANDING_URL`
- `NEXT_PUBLIC_APP_URL`

## Features

### Landing Page (`apps/landing`)
- Marketing website with Accessaurus features
- Blog powered by Sanity CMS
- Sign up/Sign in with Clerk
- Automatic redirect to dashboard after auth

### Dashboard App (`apps/app`)
- Protected routes requiring authentication
- Organization switcher for multi-tenancy
- Accessibility metrics dashboard
- Page optimization tracking

## Troubleshooting

### Build Errors

If you get build errors about missing environment variables:
1. Ensure `.env` file exists with all required values
2. For CI/CD, you can build with dummy values for Sanity if not using the blog:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=dummy NEXT_PUBLIC_SANITY_DATASET=production bun run build
   ```

### Authentication Issues

1. Verify Clerk keys are correct in `.env`
2. Ensure Organizations feature is enabled in Clerk Dashboard
3. Check that redirect URLs match your domain configuration

### Port Conflicts

If ports 3000 or 3100 are already in use, you can change them in `package.json`:
- `apps/app/package.json` - change port 3000
- `apps/landing/package.json` - change port 3100