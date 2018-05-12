import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import {Todo} from "@core/store/todo/models";
import {TodoActionsUnion} from "@core/store/todo/actions/todo";
import {TodoActionTypes} from "@core/store/todo/actions";


export interface State extends EntityState<Todo> {
    inProgress: boolean;
}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: State = todoAdapter.getInitialState({
    inProgress: false
});

export function reducer(
    state = initialState,
    action: TodoActionsUnion): State {

    switch (action.type) {

        case TodoActionTypes.AddTodo:
        case TodoActionTypes.UpdateTodo:
        case TodoActionTypes.RemoveTodo:
        case TodoActionTypes.Load: {
            return {
                ...state,
                inProgress: true
            }
        }

        case TodoActionTypes.AddTodoFail:
        case TodoActionTypes.UpdateTodoFail:
        case TodoActionTypes.RemoveTodoFail:
        case TodoActionTypes.LoadFail: {
            return {
                ...state,
                inProgress: false
            }
        }

        case TodoActionTypes.LoadSuccess: {
            /**
             * The addMany function provided by the created adapter
             * adds many records to the entity dictionary
             * and returns a new state including those records. If
             * the collection is to be sorted, the adapter will
             * sort each record upon entry into the sorted array.
             */
            return todoAdapter.addMany(action.payload, {
                ...state,
                inProgress: false,
            });
        }

        case TodoActionTypes.AddTodoSuccess: {
            return todoAdapter.addOne(action.payload, state);
        }

        case TodoActionTypes.UpdateTodoSuccess: {
            return todoAdapter.updateOne({
                id: action.payload.id,
                changes: action.payload
            }, state);
        }

        case TodoActionTypes.RemoveTodoSuccess: {
            return todoAdapter.removeOne(action.payload.id, state);
        }

        default: {
            return state;
        }
    }
}

export const getInProgress = (state: State) => state.inProgress;