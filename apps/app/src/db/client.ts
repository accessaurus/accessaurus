import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL

// Do not throw at import time to allow OPTIONS/CORS preflight without DB.
const client = connectionString
  ? postgres(connectionString, {
      max: 1,
      prepare: false,
      ssl: /^(?!.*localhost|127\.0\.0\.1).+/i.test(connectionString)
        ? { rejectUnauthorized: false }
        : undefined,
    })
  : undefined

export const db = client ? drizzle(client, { schema }) : undefined
export { schema }

export function requireDb() {
  if (!db) throw new Error('DATABASE_URL is not set')
  return db
}
