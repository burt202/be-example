import {Pool} from "pg"
import {v4} from "uuid"

import {HandledDBErrorCodes} from "../../db/types"
import {getCreationError} from "../../db/utils"
import {DbTodoListItem, TodoListItem, TodoListPersistence} from "./types"

export default function createTodoListItemsPersistence({
  pgClient,
}: {
  pgClient: Pool
}): TodoListPersistence {
  return {
    getTodoListItems: async () => {
      const query = `
        SELECT *
        FROM todo_list_items
      `

      const res = await pgClient.query<DbTodoListItem>(query)

      return res.rows.map(toTodoListItem)
    },

    createTodoListItem: async ({text}) => {
      const id = v4()

      const query = `
        INSERT INTO todo_list_items (id, item_text)
        VALUES($1, $2)
        RETURNING *
      `

      const values = [id, text]

      try {
        const res = await pgClient.query<DbTodoListItem>(query, values)
        const item = res.rows[0]

        return toTodoListItem(item)
      } catch (e: unknown) {
        return getCreationError([
          {
            code: HandledDBErrorCodes.unique_violation,
            constraint: "todo_list_item_text_key",
            errorType: "TodoListWithTextAlreadyExists",
          },
        ])(e)
      }
    },
  }
}

function toTodoListItem(item: DbTodoListItem): TodoListItem {
  return {
    id: item.id,
    text: item.item_text,
    createdAt: item.created_at,
  }
}
