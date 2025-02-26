import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  getAll(){
    return of([{title: 'Book 1', author: 'Author 1', id:1}, {id:2,title: 'Book 2', author: 'Author 2'}])
  }

  getUser(id){
return of({name: 'User 1', id: id})
  }
}
