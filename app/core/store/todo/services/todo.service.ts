import {Injectable} from "@angular/core";
import {ApiUrls} from "@core/shared/services/api";
import {ApiService} from "@core/shared/services/api/api.service";

import {Observable} from "rxjs/index";
import {Todo} from "@core/store/todo/models";

@Injectable()
export class TodosService {

    constructor(private apiService: ApiService) {
    }

    getAll(): Observable<Todo[]> {
        return new Observable(observer => {
            return this.apiService.get(ApiUrls.TODOS)
                .subscribe((response) => {
                    observer.next(response);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                });
        });
    }

    add(todo: any): Observable<Todo> {
        return new Observable(observer => {
            return this.apiService.post(ApiUrls.TODOS, todo)
                .subscribe((response) => {
                    observer.next(response);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                });
        });
    }

    update(todo: any): Observable<Todo> {
        return new Observable(observer => {
            return this.apiService.put(`${ApiUrls.TODOS}/${todo.id}`, todo)
                .subscribe((response) => {
                    observer.next(response);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                });
        });
    }

    delete(todo: any): Observable<any> {
        return new Observable(observer => {
            return this.apiService.delete(`${ApiUrls.TODOS}/${todo.id}`)
                .subscribe((response) => {
                    observer.next(response);
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                });
        });
    }
}

