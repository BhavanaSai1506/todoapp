import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import * as Todos from '@core/store/todo/actions';
import * as fromTodos from '@core/store/todo/reducers';
import {map} from 'rxjs/operators';


@Component({
  selector: 'td-todos-page',
  templateUrl: 'todos.page.html',
  styleUrls: ['./todos.page.scss']
})
export class TodosPageComponent implements OnInit {

  unfineshedTodos$: any;
  finishedTodos$: any;
  error$: any;
  todoInput: string;

  constructor(private store: Store<fromTodos.State>) {
    this.store.dispatch(new Todos.Load());
  }

  ngOnInit() {
    this.unfineshedTodos$ = this.store.select(fromTodos.selectAllTodos).pipe(
      map((entities: any) => entities && entities.filter((todo) => !todo.completed))
    );

    this.finishedTodos$ = this.store.select(fromTodos.selectAllTodos).pipe(
      map((entities: any) => entities && entities.filter((todo) => todo.completed))
    );
    this.error$ = this.store.select(fromTodos.getError);
  }


  addTodo() {
    this.store.dispatch(new Todos.AddTodo(
      {
        title: this.todoInput,
        completed: false
      }
    ));
    this.todoInput = "";
  }

  setCompleted(todo) {
    let copy = Object.assign({}, todo);
    copy.completed = true;
    this.store.dispatch(new Todos.UpdateTodo(copy));
  }

  delete(todo) {
    this.store.dispatch(new Todos.RemoveTodo(todo));
  }
}
