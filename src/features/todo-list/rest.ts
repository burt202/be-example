import {z} from "zod"

import {RestHandler} from "../../types"
import {TodoListItem} from "./types"

const getTodoListItems: RestHandler<never, TodoListItem[]> = {
  name: "get-todo-list-items",
  path: "/v1/todo-list-items",
  method: "get",
  handler:
    ({persistence}) =>
    async () => {
      const items = await persistence.getTodoListItems()

      return items
    },
}

const createTodoListItemRequestSchema = z.object({
  body: z.object({
    text: z.string(),
  }),
})

const createTodoListItem: RestHandler<
  z.infer<typeof createTodoListItemRequestSchema>,
  {item: TodoListItem}
> = {
  name: "create-todo-list-item",
  path: "/v1/todo-list-items",
  method: "post",
  requestSchema: createTodoListItemRequestSchema,
  handler:
    ({persistence}) =>
    async (req) => {
      const text = req.body.text.trim()

      if (text.length === 0) {
        return {error: true, status: 400, type: "TextRequired"}
      }

      const payload = {
        text,
      }

      const res = await persistence.createTodoListItem(payload)

      if ("error" in res) {
        return {error: true, status: 400, type: res.type}
      }

      return {item: res}
    },
}

export default [getTodoListItems, createTodoListItem]
