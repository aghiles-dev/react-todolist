import { Todo } from './Interfaces';

declare type ChangeCallback = (store: TodoStore) => void;

export class TodoStore {
  private static i: number = 0;
  todos: Todo[] = [];
  private callbacks: ChangeCallback[] = [];

  static increment () {
    return this.i++;
  }

  inform () {
    this.callbacks.forEach(callback => callback(this));
  }

  onChange (callback: ChangeCallback) {
    this.callbacks.push(callback);
  }

  addTodo (title: string): void {
    this.todos = [
      {
        id: TodoStore.increment(),
        title: title,
        completed: false
      },
      ...this.todos
    ];
    this.inform();
  }

  removeTodo (todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo);
    this.inform();
  }

  toggleTodo (todo: Todo): void {
    this.todos = this.todos.map(t => (t === todo ? { ...t, completed: !t.completed } : t));
    this.inform();
  }

  updateTitle (todo: Todo, title: string): void {
    this.todos = this.todos.map(t => (t === todo ? { ...t, title } : t));
    this.inform();
  }

  toggleAll (completed: boolean = true): void {
    this.todos = this.todos.map(
      t => (t.completed !== completed ? { ...t, completed } : t)
    );
    this.inform();
  }

  clearCompleted (): void {
    this.todos = this.todos.filter(t => !t.completed);
    this.inform();
  }
}
