import "dotenv/config"

import {z} from "zod"

const host = process.env.HOST as string
const port = process.env.PORT as string
const dbUsername = process.env.DB_USER as string
const dbPassword = process.env.DB_PASSWORD as string
const dbHost = process.env.DB_HOST as string
const dbPort = process.env.DB_PORT as string
const dbName = process.env.DB_NAME as string
const dbSslEnabled = process.env.DB_SSL_ENABLED as string

const configSchema = z.object({
  host: z.string(),
  port: z.number(),
  dbUsername: z.string(),
  dbPassword: z.string(),
  dbHost: z.string(),
  dbPort: z.number(),
  dbName: z.string(),
  dbSslEnabled: z.boolean(),
})

export type Config = z.infer<typeof configSchema>

export const config: Config = {
  host,
  port: parseInt(port, 10),
  dbUsername,
  dbPassword,
  dbHost,
  dbPort: parseInt(dbPort, 10),
  dbName,
  dbSslEnabled: dbSslEnabled === "true",
}

export function validateConfig() {
  configSchema.parse(config)
}
