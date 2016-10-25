import {Component, OnInit} from '@angular/core';
import {Todo} from '../shared/todo';
import {TodoService} from '../shared/todo.service';
import {FirebaseListObservable} from 'angularfire2';

@Component({
    selector: 'todo-list',
    templateUrl: 'todo.component.html',
    styleUrls: ['todo.component.css'],
    providers: [TodoService]
})

export class TodoComponent implements OnInit {
    todos: FirebaseListObservable<any[]>;

    constructor(private todoService:TodoService) {
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
        this.todoService.getTodos("qGvn87kuQxf2LC7iTL84M4p0qif2")
    }
}
