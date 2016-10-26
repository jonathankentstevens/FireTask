import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Todo} from './todo'

@Injectable()
export class TodoService {
    todos:FirebaseListObservable<Todo[]>;

    constructor(private af:AngularFire) {
    }

    getList(uid:string) {
        this.todos = this.af.database.list(uid + "/todos")
        return this.todos;
    }

    addTodo(todo:Todo) {
        this.todos.push(todo);
    }

    updateTodo(todo:Todo, values:Object = {}) {
        this.todos.update(todo, values);
    }

    toggleTodoComplete(todo:Todo) {
        let updatedTodo = this.updateTodo(todo, {
            completed: !todo.completed
        });
        return updatedTodo;
    }

    removeTodo(todo:Todo) {
        this.todos.remove(todo);
    }
}
