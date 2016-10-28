export class Todo {
    $key;
    $exists;
    title:string = '';
    description:string = '';
    completed:boolean = false;
    important:boolean = false;
    showDetails:boolean = false;
    photoUrl:string = '';
    photoName:string = '';

    constructor(values:Object = {}) {
        Object.assign(this, values);
    }
}
