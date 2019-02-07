import { Injectable } from '@angular/core';
import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Todo } from './todo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private url = '/assets/data/todos.json';
  private _url = 'api/todos';
  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this._url).pipe(catchError(this.errorHandler))
  }

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this._url}/${id}`).pipe(catchError(this.errorHandler));
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this._url}/${todo.id}`, todo, httpOptions)
    .pipe(catchError(this.errorHandler));
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    let newUrl: string = `${this._url}/${todo.id}`;
    console.log(newUrl);
    return this.http.delete<Todo>(newUrl, httpOptions)
    .pipe(catchError(this.errorHandler));
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this._url, todo, httpOptions)
    .pipe(catchError(this.errorHandler));
  } 

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error!!');
  }
}
