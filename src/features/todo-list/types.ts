import {CreateError} from "../../db/types"

export interface DbTodoListItem {
  id: string
  item_text: string
  created_at: string
}

export interface TodoListItem {
  id: string
  text: string
  createdAt: string
}

export interface TodoListPersistence {
  getTodoListItems(): Promise<TodoListItem[]>
  createTodoListItem(params: {
    text: string
  }): Promise<TodoListItem | CreateError>
}
