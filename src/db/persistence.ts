import {Pool} from "pg"

import createTodoListItemsPersistence from "../features/todo-list/persistence"
import {Persistence} from "./types"

export default function createPersistence({
  pgClient,
}: {
  pgClient: Pool
}): Persistence {
  return {
    ...createTodoListItemsPersistence({pgClient}),
  }
}
