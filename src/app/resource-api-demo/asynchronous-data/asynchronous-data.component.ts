import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';

import { distinctUntilChanged, map, catchError } from 'rxjs';
import { API_URL, ApiService, User } from '../api.service';

@Component({
  selector: 'app-asynchronous-data',
  // imports: [],
  templateUrl: './asynchronous-data.component.html',
  styleUrl: './asynchronous-data.component.scss',
  standalone: false
})
export class AsynchronousDataComponent {

  #http = inject(HttpClient);
  #apiService = inject(ApiService);

  apiUsers = this.#apiService.users;

  // Set it to undefined to postpone the API call to when the query has a value
  query = signal<string | undefined>(undefined);

  users = resource<User[], string | undefined>({
    request: () => this.query(),
    loader: async ({ request, abortSignal }) => {
      const users = await fetch(`${API_URL}/search?q=${request}`, {
        signal: abortSignal,
      });

      if (!users.ok) throw Error('Unable to load!');
      return (await users.json()).users;
    },
  });

  rxUsers = rxResource<User[], string | undefined>({
    request: () => this.query(),
    loader: ({ request }) =>
      this.#http.get<{ users: User[] }>(`${API_URL}/search?q=${request}`).pipe(
        distinctUntilChanged(),
        map(({ users }) => users),
        catchError(() => {
          throw Error('Unable to load!');
        })
      ),
  });

  search(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.query.set(value);

    this.#apiService.doApiCall(value);
  }

  load() {
    this.query.set('');
    this.#apiService.doApiCall();
  }

  reload() {
    this.users.reload();
    this.rxUsers.reload();
  }
}


