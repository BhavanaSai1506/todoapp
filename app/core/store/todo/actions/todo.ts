import {Action} from '@ngrx/store';
import {Todo} from "@core/store/todo/models/todo";

export enum TodoActionTypes {
    AddTodo = '[Todo] Add Todo',
    AddTodoSuccess = '[Todo] Add Todo Success',
    AddTodoFail = '[Todo] Add Todo Fail',
    RemoveTodo = '[Todo] Remove Todo',
    RemoveTodoSuccess = '[Todo] Remove Todo Success',
    RemoveTodoFail = '[Todo] Remove Todo Fail',
    UpdateTodo = '[Todo] Update Todo',
    UpdateTodoSuccess = '[Todo] Update Todo Success',
    UpdateTodoFail = '[Todo] Update Todo Fail',
    Load = '[Book] Load Todos',
    LoadSuccess = '[Book] Load Todos Success',
    LoadFail = '[Book] Load Todos Fail',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class AddTodo implements Action {
    readonly type = TodoActionTypes.AddTodo;

    constructor(public payload: Todo) {
    }
}

export class AddTodoSuccess implements Action {
    readonly type = TodoActionTypes.AddTodoSuccess;

    constructor(public payload: Todo) {
    }
}

export class AddTodoFail implements Action {
    readonly type = TodoActionTypes.AddTodoFail;

    constructor(public payload?: any) {
    }
}

export class RemoveTodo implements Action {
    readonly type = TodoActionTypes.RemoveTodo;

    constructor(public payload: Todo) {
    }
}

export class RemoveTodoSuccess implements Action {
    readonly type = TodoActionTypes.RemoveTodoSuccess;

    constructor(public payload: Todo) {
    }
}

export class RemoveTodoFail implements Action {
    readonly type = TodoActionTypes.RemoveTodoFail;

    constructor(public payload?: any) {
    }
}

export class UpdateTodo implements Action {
    readonly type = TodoActionTypes.UpdateTodo;

    constructor(public payload: Todo) {
    }
}

export class UpdateTodoSuccess implements Action {
    readonly type = TodoActionTypes.UpdateTodoSuccess;

    constructor(public payload: Todo) {
    }
}

export class UpdateTodoFail implements Action {
    readonly type = TodoActionTypes.UpdateTodoFail;

    constructor(public payload?: any) {
    }
}

export class Load implements Action {
    readonly type = TodoActionTypes.Load;

    constructor(public payload?: string) {
    }
}

export class LoadSuccess implements Action {
    readonly type = TodoActionTypes.LoadSuccess;

    constructor(public payload?: Todo[]) {
    }
}

export class LoadFail implements Action {
    readonly type = TodoActionTypes.LoadFail;

    constructor(public payload?: string) {
    }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TodoActionsUnion =
    | AddTodo
    | AddTodoSuccess
    | AddTodoFail
    | RemoveTodo
    | RemoveTodoSuccess
    | RemoveTodoFail
    | UpdateTodo
    | UpdateTodoSuccess
    | UpdateTodoFail
    | Load
    | LoadSuccess
    | LoadFail;