import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  private todos: Todo[];
  private loadedTodos: boolean = false;
  private errorMsg;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos()
    .subscribe(todos => {
      this.todos = todos;
      this.loadedTodos = true;
    }, error => this.errorMsg = error);
  }

  delete(todo: Todo) {
    console.log("clicked delete");
    this.todos = this.todos.filter(td => td !== todo);
    this.todoService.deleteTodo(todo).subscribe();
  }

}
