import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  private todo: Todo;
  constructor(
    private todoService: TodoService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTodo();
  }

  getTodo() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.todoService.getTodo(id).subscribe(todo => this.todo = todo);
  }

  goBack() {
    this.location.back();
  }

  save() {
    if (!this.todo.title) {
      return;
    }
    this.todoService.updateTodo(this.todo).subscribe(todo => this.todo = todo);
    this.goBack();
  }

}
