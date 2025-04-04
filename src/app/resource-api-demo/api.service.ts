import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ApiService {
  #http = inject(HttpClient);
  #response = signal<User[] | null>(null);

  get users() {
    return this.#response.asReadonly();
  }

  doApiCall(request: string = '') {
    this.#http
      .get<{ users: User[] }>(`${API_URL}/search?q=${request}`)
      .pipe(
        distinctUntilChanged(),
        map(({ users }) => users)
      )
      .subscribe((response) => this.#response.set(response));
  }

  getTodoById(id: number): Observable<Todo> {
    return this.#http.get<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
}

export const API_URL: string = 'https://dummyjson.com/users';
export type User = {
  id: number;
  firstName: string;
  lastName: string;
};

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}