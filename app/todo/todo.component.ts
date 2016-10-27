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
    newTodo:Todo = new Todo();
    updatedTitle:string;

    constructor(private todoService:TodoService, private authService:AuthService) {
    }

    addTodo() {
        this.todoService.addTodo(this.newTodo);
        this.newTodo = new Todo();
    }

    toggleTodoComplete(todo:Todo) {
        this.todoService.toggleTodoComplete(todo);
    }

    removeTodo(todo:Todo) {
        this.todoService.removeTodo(todo);
    }
    
    updateTitle(todo:Todo, $event) {
        this.todoService.updateTodo(todo, {
            title: $event.target.value
        });
    }

    updateDescription(todo:Todo, $event) {
        this.todoService.updateTodo(todo, {
            description: $event.target.value.trim()
        });
    }

    toggleDetails(todo:Todo) {
        todo.showDescription = !todo.showDescription;
    }

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
