import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {catchError, map, switchMap} from "rxjs/operators";
import {Action} from "@ngrx/store";
import {Observable, of} from "rxjs/index";

import {TodosService} from "@core/store/todo/services/todo.service";
import {
    AddTodo,
    AddTodoFail,
    AddTodoSuccess,
    Load,
    LoadFail,
    LoadSuccess,
    RemoveTodo,
    RemoveTodoFail,
    RemoveTodoSuccess,
    TodoActionTypes,
    UpdateTodo,
    UpdateTodoFail,
    UpdateTodoSuccess
} from "@core/store/todo/actions";
import {Todo} from "@core/store/todo/models";
import {mergeMap} from "rxjs/internal/operators";

@Injectable()
export class TodosEffects {
    constructor(private todosService: TodosService, private actions$: Actions) {
    }

    @Effect()
    getAll$: Observable<Action> = this.actions$.pipe(
        ofType<Load>(TodoActionTypes.Load),
        map((action: Load) => action.payload),
        switchMap(() =>
            this.todosService.getAll().pipe(
                map((response: Todo[]) => new LoadSuccess(response)),
                catchError(err => of(new LoadFail(err)))
            )
        )
    );

    @Effect()
    add$: Observable<Action> = this.actions$.pipe(
        ofType<AddTodo>(TodoActionTypes.AddTodo),
        map((action: AddTodo) => action.payload),
        switchMap((payload: Partial<Todo>) =>
            this.todosService.add(payload).pipe(
                mergeMap((response: Todo) => [
                    new AddTodoSuccess(response),
                    new Load()
                ]),
                catchError(err => of(new AddTodoFail(err)))
            )
        )
    );

    @Effect()
    update$: Observable<Action> = this.actions$.pipe(
        ofType<UpdateTodo>(TodoActionTypes.UpdateTodo),
        map((action: UpdateTodo) => action.payload),
        switchMap((payload: Todo) =>
            this.todosService.update(payload).pipe(
                map((response: Todo) => new UpdateTodoSuccess(response)),
                catchError(err => of(new UpdateTodoFail(err)))
            )
        )
    );

    @Effect()
    delete$: Observable<Action> = this.actions$.pipe(
        ofType<RemoveTodo>(TodoActionTypes.RemoveTodo),
        map((action: RemoveTodo) => action.payload),
        switchMap((payload: Todo) =>
            this.todosService.delete(payload).pipe(
                map((response: Todo) => new RemoveTodoSuccess(payload)),
                catchError(err => of(new RemoveTodoFail(err)))
            )
        )
    );
}