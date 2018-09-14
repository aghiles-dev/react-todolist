import { Todo } from './Interfaces';

export class TodoStore {
  private static i: number = 0;
  todos: Todo[] = [];

  static increment () {
    return this.i++;
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
  }

  removeTodo (todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo);
  }

  toggleTodo (todo: Todo, completed: boolean = true): void {
    this.todos = this.todos.map(t => (t === todo ? { ...t, completed } : t));
  }

  updateTitle (todo: Todo, title: string): void {
    this.todos = this.todos.map(t => (t === todo ? { ...t, title } : t));
  }

  toggleAll (completed: boolean = true): void {
    this.todos = this.todos.map(
      t => (t.completed !== completed ? { ...t, completed } : t)
    );
  }

  clearCompleted (): void {
    this.todos = this.todos.filter(t => !t.completed);
  }
}
