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

export const selectTodoState = createFeatureSelector<fromTodo.State>('todo');

export const {
    selectIds: selectTodoIds,
    selectEntities: selectTodoEntities,
    selectTotal: selectTodosTotal,
    selectAll: selectAllTodos
} = fromTodo.todoAdapter.getSelectors(
    selectTodoState
);

export const getInProgress = createSelector(
    selectTodoState,
    fromTodo.getInProgress
);