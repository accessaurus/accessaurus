import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  // It's fine if this throws at runtime when DB is needed; we avoid connecting eagerly in dev
  console.warn('DATABASE_URL is not set. Drizzle client will be unusable until it is provided.')
}

// Create a lazy Postgres.js client; disable prepared statements for serverless friendliness
const client = connectionString
  ? postgres(connectionString, {
      max: 1,
      prepare: false,
      // enable SSL in production URLs automatically if needed
      ssl: /^(?!.*localhost|127\.0\.0\.1).+/i.test(connectionString)
        ? { rejectUnauthorized: false }
        : undefined,
    })
  : undefined

export const db = client ? drizzle(client, { schema }) : undefined
export { schema }

