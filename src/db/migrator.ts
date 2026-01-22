import {migrate} from "postgres-migrations"

import {Deps} from "../types"

export interface Migrator {
  isComplete(): boolean
  runMigrations(): Promise<void>
}

export default function createMigrator({log, pgClient}: Deps): Migrator {
  let complete = false

  return {
    isComplete() {
      return complete
    },
    async runMigrations(): Promise<void> {
      log.info("Attempting database migrations")

      const client = await pgClient.connect()

      return migrate(
        {
          client,
        },
        "src/db/migrations",
      )
        .then((migrations) => {
          log.info("Successfully migrated database", {
            numberOfMigrations: migrations.length,
          })

          complete = true
          client.release()
        })
        .catch((e: unknown) => {
          log.info("Could not run database migrations", {
            err: JSON.stringify(e),
          })

          process.exit(1)
        })
    },
  }
}
