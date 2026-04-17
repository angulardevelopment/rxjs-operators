import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ApplicationConfig } from '@angular/core';
// Import necessary functional providers (e.g., for routing, http)
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes'; // Your application routes
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));

const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Configure routing
    provideHttpClient(), // Enable the HttpClient
    // ... other providers like provideAnimations()
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
};

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
