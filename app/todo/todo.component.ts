import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {AuthService} from '../shared/auth.service';
import {Todo} from '../shared/todo'

@Component({
    selector: 'todo-list',
    templateUrl: 'todo.component.html',
    styleUrls: ['todo.component.css'],
    providers: [TodoService, AuthService]
})

export class TodoComponent implements OnInit {
    todos:Todo[] = [];

    constructor(private todoService:TodoService, private authService:AuthService) {
    }

    // addTodo() {
    //     this.todoService.addTodo(this.newTodo);
    //     this.newTodo = new Todo();
    // }

    toggleTodoComplete(todo) {
        this.todoService.toggleTodoComplete(todo);
    }

    // removeTodo(todo) {
    //     this.todoService.deleteTodoById(todo.id);
    // }

    // get todos() {
    //     return this.todoService.getAllTodos();
    // }

    ngOnInit() {
        this.authService.getCurrent().subscribe(auth => {
           if (auth) {
               this.todoService.getList(auth.uid).subscribe(todos => {
                   console.log(todos);
                   this.todos = todos;
               });
           }
        });
    }
}
