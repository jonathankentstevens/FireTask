import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from './auth.service';

@Injectable()
export class TodoService {

    constructor(private af:AngularFire, private authService:AuthService) {
    }
    
    getTodos(uid:string) {
        this.af.database.list(uid + "/todos").subscribe(obs => {
            console.log(obs);
        });
    }

    // Simulate POST /todos
    // addTodo(todo: Todo): TodoService {
    //   if (!todo.id) {
    //     todo.id = ++this.lastId;
    //   }
    //   this.todos.push(todo);
    //   return this;
    // }

    // Simulate DELETE /todos/:id
    // deleteTodoById(id: number): TodoService {
    //   this.todos = this.todos
    //     .filter(todo => todo.id !== id);
    //   return this;
    // }

    // Simulate PUT /todos/:id
    // updateTodoById(id: number, values: Object = {}): Todo {
    //   let todo = this.getTodoById(id);
    //   if (!todo) {
    //     return null;
    //   }
    //   Object.assign(todo, values);
    //   return todo;
    // }

    // Simulate GET /todos/:id
    // getTodoById(id: number): Todo {
    //   return this.todos
    //     .filter(todo => todo.id === id)
    //     .pop();
    // }

    // Toggle todo complete
    // toggleTodoComplete(todo: Todo){
    //   let updatedTodo = this.updateTodoById(todo.id, {
    //     complete: !todo.complete
    //   });
    //   return updatedTodo;
    // }

}
