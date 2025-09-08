import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.warn('DATABASE_URL is not set. Drizzle client will be unusable until it is provided.')
}

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
