import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { addToViewTree } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {

  @Input('todoList') todos: Todo[];
  public errorMsg;
  private todoTitle: string = "";
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  clickedKey(keyEvent) {
    if (keyEvent.keyCode == 13) {
      console.log("Clicked Enter");
      this.addTodo(this.todoTitle, "");
      this.todoTitle = "";
    }
  }

  addTodo(todoTitle: string, todoDesc: string) {
    todoTitle = todoTitle.trim();
    todoDesc = todoDesc.trim();
    if (!todoTitle) {
      return;
    }
    if (!todoDesc) {
      todoDesc = "";
    }
    console.log(`Title: ${todoTitle} Description: ${todoDesc}`);
    console.log("todos: " + this.todos);
    let id = this.todos.length;
    console.log(`id: ${id}`);
    //this.todos.push({"id": 0, "title":todoTitle, "description":todoDesc} as Todo);
    this.todoService.addTodo({"complete": false, "title":todoTitle, "description":todoDesc} as Todo)
    .subscribe(todo => {
      this.todos.push(todo);
    }, error => this.errorMsg = error);
  }

}
