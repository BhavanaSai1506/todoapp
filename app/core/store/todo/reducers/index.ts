import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromTodo from '@core/store/todo/reducers/todo.reducer';
import * as fromRoot from '@core/store';

export interface TodoState {
    todos: fromTodo.State;
}

export interface State extends fromRoot.State {
    todos: TodoState;
}

export const reducers: ActionReducerMap<any> = {
    todos: fromTodo.reducer
};

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectTodos = createSelector(
    selectTodoState,
    (state: TodoState) => state.todos
);

export const getInProgress = createSelector(
    selectTodos,
    fromTodo.getInProgress
);

export const getError = createSelector(
    selectTodos,
    fromTodo.getError
);

export const selectAllTodos = createSelector(
    selectTodos,
    fromTodo.selectAll
);