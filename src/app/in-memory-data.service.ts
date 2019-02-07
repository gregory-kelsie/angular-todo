import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const todos = [
      {"id": 1, "complete": false, "title": "Brush Teeth", "description": "Use toothbrush and toothpaste to clean teeth."},
      {"id": 2, "complete": false, "title": "Get Dressed", "description": "Take off pyjamas and put on clothes."},
      {"id": 3, "complete": false, "title": "Eat Breakfast", "description": "Make breakfast and eat it before going out."},
      {"id": 4, "complete": false, "title": "Pack Bag", "description": "Pack bag with school supplies and lunch."},
      {"id": 5, "complete": false, "title": "Walk to School", "description": "Leave the house and walk to school."},
      {"id": 6, "complete": false, "title": "School", "description": "Attend classes, hang out with friends and learn"}
  
  ]
    return { todos };
  }

  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }
}
