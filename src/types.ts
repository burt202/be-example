import {IncomingHttpHeaders} from "http"
import {Pool} from "pg"
import {ZodType} from "zod"

import {Config} from "./config"
import {Persistence} from "./db/types"

interface Context {
  [index: string]: string | number
}

export interface Logger {
  info: (log: string, context?: Context) => void
  warn: (log: string, context?: Context) => void
  error: (log: string, context?: Context) => void
}

export interface Deps {
  config: Config
  log: Logger
  persistence: Persistence
  pgClient: Pool
}

interface RestError {
  error: true
  status: number
  type?: string
}

export interface RestHandler<RequestSchema, ReturnType> {
  name: string
  path: string
  method: "get" | "post" | "put"
  requestSchema?: ZodType
  handler: (
    deps: Deps,
  ) => (
    req: RequestSchema & {headers: IncomingHttpHeaders},
  ) => Promise<ReturnType | RestError>
}
