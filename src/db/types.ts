import {TodoListPersistence} from "../features/todo-list/types"

export type Persistence = TodoListPersistence

export enum HandledDBErrorCodes {
  "foreign_key_violation" = "23503",
  "unique_violation" = "23505",
}

export interface CreateError {
  error: true
  type: string
}
