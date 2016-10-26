import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {AuthService} from '../shared/auth.service';
import {FirebaseListObservable} from 'angularfire2';

@Component({
    selector: 'todo-list',
    templateUrl: 'todo.component.html',
    styleUrls: ['todo.component.css'],
    providers: [TodoService, AuthService]
})

export class TodoComponent implements OnInit {
    todos:Array<any> = [];

    constructor(private todoService:TodoService, private authService:AuthService) {
    }

    // addTodo() {
    //     this.todoService.addTodo(this.newTodo);
    //     this.newTodo = new Todo();
    // }

    // toggleTodoComplete(todo) {
    //     this.todoService.toggleTodoComplete(todo);
    // }

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
                   this.todos = todos;
               });
           }
        });
    }
}
