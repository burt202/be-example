import {DatabaseError} from "pg"

interface ErrorConfig {
  code: string
  constraint: string
  errorType: string
}

export function getCreationError(config: Array<ErrorConfig>) {
  return (e: unknown) => {
    if (e instanceof DatabaseError) {
      const match = config.find((c) => {
        return c.code === e.code && c.constraint === e.constraint
      })

      if (match) {
        return {error: true as const, type: match.errorType}
      }
    }

    return {error: true as const, type: "ErrorCreatingDatabaseObject"}
  }
}
