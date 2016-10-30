import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Todo} from './todo'

@Injectable()
export class TodoService {
    todos:FirebaseListObservable<Todo[]>;
    uploadProgress:number;

    constructor(private af:AngularFire) {
    }

    get(auth) {
        this.todos = this.af.database.list(`/users/${auth.uid}/todos`)
        return this.todos;
    }

    put(todo:Todo) {
        if (!todo.photoUrl) {
            todo.photoName = "placeholder.jpg"
            todo.photoUrl = "https://firebasestorage.googleapis.com/v0/b/todo-app-4a005.appspot.com/o/placeholder.jpg?alt=media&token=4d82c187-41a6-46d1-9786-707a7c4f4e93"
        }
        this.todos.push(todo);
    }
    
    post(todo:Todo, values:Object = {}) {
        if (!todo.photoUrl) {
            todo.photoName = "placeholder.jpg"
            todo.photoUrl = "https://firebasestorage.googleapis.com/v0/b/todo-app-4a005.appspot.com/o/placeholder.jpg?alt=media&token=4d82c187-41a6-46d1-9786-707a7c4f4e93"
        }
        this.todos.update(todo, values);
    }

    toggleTodoComplete(todo:Todo) {
        let updatedTodo = this.post(todo, {
            completed: !todo.completed
        });
        return updatedTodo;
    }

    delete(todo:Todo) {
        if (todo.photoName != "placeholder.jpg" && (todo.photoName || todo.photoUrl)) {
            this.removePhoto(todo);
            todo.photoName = "placeholder.jpg"
            todo.photoUrl = "https://firebasestorage.googleapis.com/v0/b/todo-app-4a005.appspot.com/o/placeholder.jpg?alt=media&token=4d82c187-41a6-46d1-9786-707a7c4f4e93"
        }
        this.todos.remove(todo);
    }

    removePhoto(todo:Todo):Promise<any> {
        return new Promise((resolve, reject) => {
            this.post(todo, {
                photoUrl: "",
                photoName: ""
            })
            firebase.storage().ref().child(`/${todo.$key}/${todo.photoName}`).delete().then(function() {
                resolve("File Removed");
            }).catch(function(error) {
                reject(error);
            });
        });
    }

    uploadPhoto(todo:Todo, file:File):Promise<any> {
        return new Promise((resolve, reject) => {
            var uploadTask = firebase.storage().ref().child(`/${todo.$key}/${file.name}`).put(file);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function(snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Uploading: ' + this.uploadProgress + '%');
                }, function(error) {
                    reject(error);
                }, function() {
                    // Upload completed successfully, now we can get the download URL
                    var photoUrl = uploadTask.snapshot.downloadURL;
                    resolve(photoUrl);
                });
        });
    }

}
