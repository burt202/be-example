import * as bodyParser from "body-parser"
import express from "express"

import {config, validateConfig} from "./config"
import pgClient from "./db"
import createMigrator from "./db/migrator"
import createPersistence from "./db/persistence"
import createLogger from "./logger"
import handlers from "./rest"
import {Deps} from "./types"

const restHandlers = [...handlers]

const statusCodeTypeMap = {
  403: "NotAuthorised",
} as Record<number, string>

async function startServer() {
  const app = express()

  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())

  const log = createLogger()
  const persistence = createPersistence({pgClient})

  const deps: Deps = {
    config,
    log,
    persistence,
    pgClient,
  }

  app.get("/", (_, res) => {
    res.send("Ok")
  })

  restHandlers.forEach((e) => {
    app[e.method](e.path, (req, res) => {
      if (e.requestSchema) {
        const validationResponse = e.requestSchema.safeParse(req)

        if (!validationResponse.success) {
          res
            .status(400)
            .send({body: {error: true, type: "RequestSchemaError"}})
          return
        }
      }

      void e
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .handler(deps)(req)
        .then((restResponse) => {
          if ("error" in restResponse) {
            res.status(restResponse.status).send({
              body: {
                error: true,
                type: statusCodeTypeMap[restResponse.status]
                  ? statusCodeTypeMap[restResponse.status]
                  : restResponse.type,
              },
            })
            return
          }

          res.send({body: restResponse})
        })
    })
  })

  const migrator = createMigrator(deps)
  await migrator.runMigrations()

  app.listen({port: config.port}, () =>
    console.info(`Server ready at ${config.host}:${config.port}`),
  )
}

try {
  validateConfig()
} catch (err) {
  console.error("Invalid config", err)
  process.exit(1)
}

void startServer()
