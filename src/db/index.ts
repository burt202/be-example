import {Pool} from "pg"

import {config} from "../config"

const pool = new Pool({
  database: config.dbName,
  user: config.dbUsername,
  password: config.dbPassword,
  host: config.dbHost,
  port: config.dbPort,
  ...(config.dbSslEnabled ? {ssl: {rejectUnauthorized: false}} : {}),
})

export default pool
