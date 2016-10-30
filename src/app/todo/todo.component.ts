import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {AuthService} from '../shared/auth.service';
import {Todo} from '../shared/todo';

@Component({
    selector: 'todo-list',
    templateUrl: 'todo.component.html',
    styleUrls: ['todo.component.css'],
    providers: [TodoService, AuthService]
})

export class TodoComponent implements OnInit {
    todos:Todo[] = [];
    newTodo:Todo = new Todo();
    selectedTodo:Todo = new Todo();
    uploadProgress:number;

    constructor(private todoService:TodoService, private authService:AuthService) {
    }

    addTodo() {
        this.todoService.put(this.newTodo);
        this.newTodo = new Todo();
    }

    toggleTodoComplete(todo:Todo) {
        this.todoService.toggleTodoComplete(todo);
    }

    removeTodo(todo:Todo) {
        this.todoService.delete(todo);
    }

    toggleModal(todo:Todo, id:string) {
        let element:HTMLElement = document.getElementById(id);
        if (element.style.display == "none" || element.style.display == "") {
            this.selectedTodo = todo;
            element.style.display = "block";
        } else {
            this.selectedTodo = new Todo();
            element.style.display = "none";
        }
    }

    updateTitle(todo:Todo, $event) {
        this.todoService.post(todo, {
            title: $event.target.value
        });
    }

    updateDescription(todo:Todo) {
        this.todoService.post(todo, {
            description: todo.description
        });
    }

    updateAlert() {
        console.log("Update alert", this.selectedTodo);
        this.toggleModal(this.selectedTodo, "addAlertModal");
    }

    updatePhoto() {
        let element:HTMLInputElement = <HTMLInputElement>document.getElementById("todoPhoto");
        this.todoService.uploadPhoto(this.selectedTodo, element.files[0]).then((data) => {
            this.todoService.post(this.selectedTodo, {
                photoUrl: data,
                photoName: element.files[0].name
            });
            this.toggleModal(this.selectedTodo, "addPhotoModal");
        }).catch((exception) => {
            console.log("Error uploading photo:", exception);
        });
    }

    removePhoto() {
        this.todoService.removePhoto(this.selectedTodo);
        this.toggleModal(this.selectedTodo, "addPhotoModal");
    }

    showDetails(todo:Todo) {
        todo.showDetails = true;
    }

    hideDetails(todo:Todo) {
        // this.updateDescription(todo);
        todo.showDetails = false;
    }

    ngOnInit() {
        this.authService.getCurrent().subscribe(auth => {
            if (auth) {
                this.todoService.get(auth).subscribe(todos => {
                    this.todos = todos;
                });
            } else {
                this.todos = [];
            }
        });
    }
}
