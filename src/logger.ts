import {Logger} from "./types"

export default function createLogger(): Logger {
  return {
    info: (log, context) => {
      console.info(log, JSON.stringify(context ?? {}))
    },
    warn: (log, context) => {
      console.warn(log, JSON.stringify(context ?? {}))
    },
    error: (log, context) => {
      console.error(log, JSON.stringify(context ?? {}))
    },
  }
}
