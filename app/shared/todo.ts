export class Todo {
    $key;
    $exists;
    title:string = '';
    description:string = '';
    showDescription:boolean = false;
    completed:boolean = false;
    important:boolean = false;

    constructor(values:Object = {}) {
        Object.assign(this, values);
    }
}
