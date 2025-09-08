import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    // Used by `drizzle-kit migrate` and Studio; set in your environment
    url: process.env.DATABASE_URL ?? '',
  },
  verbose: true,
  strict: true,
})

