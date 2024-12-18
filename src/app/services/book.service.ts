import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  getAll(){
    return of([])
  }

  getUser(id){
console.log(id)
  }
}
