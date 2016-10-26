export class Todo {
  $key;
  $exists;
  title: string = '';
  completed: boolean = false;
  important: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
