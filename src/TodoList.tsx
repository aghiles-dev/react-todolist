import * as React from 'react';
import { TodoStore } from './TodoStore';
import { Todo } from './Interfaces';
import { TodoItem } from './TodoItem';
import { FormEvent, KeyboardEvent } from 'react';

interface TodoListProps {}

interface TodoListState {
  todos: Todo[];
  newTodo: string;
}

export class TodoList extends React.Component<TodoListProps, TodoListState> {
  private store: TodoStore = new TodoStore();
  private toggleTodo: (todo: Todo) => void;
  private removeTodo: (todo: Todo) => void;

  constructor (props: TodoListProps) {
    super(props);
    this.state = {
      todos: [],
      newTodo: ''
    };
    this.store.onChange(store => {
      this.setState({ todos: this.store.todos });
    });

    this.toggleTodo = this.store.toggleTodo.bind(this.store);
    this.removeTodo = this.store.removeTodo.bind(this.store);
  }

  componentDidMount () {
    this.store.addTodo('hello');
    this.store.addTodo('Les gens');
  }

  get remaining (): number {
    return this.state.todos.reduce(
      (count, todo) => (!todo.completed ? count + 1 : count),
      0
    );
  }

  render () {
    const { todos, newTodo } = this.state;
    const remaining = this.remaining;
    return (
      <section className="todolist not-done">
        <h1>Todos</h1>
        <div className="form-group">
          <input
            type="text"
            className="form-control add-todo"
            value={newTodo}
            placeholder="Add todo"
            onChange={() => true}
            onKeyPress={this.addTodo}
            onInput={this.updateNewTodo}
          />
        </div>

        <button id="checkAll"
                className="btn btn-success"
                onClick={this.toggleAll}>
          Mark all as {remaining === 0 && 'not '}done
        </button>

        <hr />

        <ul id="sortable" className="list-unstyled ui-sortable">
          {todos.map(todo => {
            return (
              <TodoItem
                todo={todo}
                key={todo.id}
                onToggle={this.toggleTodo}
                onRemove={this.removeTodo}
              />
            );
          })}
        </ul>

        <div className="todo-footer">
          {remaining > 0 && (
            <span>
              <strong>{remaining}</strong> Item{remaining > 1 && 's'} Left
            </span>
          )}
        </div>
      </section>
    );
  }

  updateNewTodo = (event: FormEvent<HTMLInputElement>) => {
    this.setState({ newTodo: (event.target as HTMLInputElement).value });
  }

  addTodo = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.store.addTodo(this.state.newTodo);
      this.setState({ newTodo: '' });
    }
  }

  toggleAll = () => {
    this.store.toggleAll(this.remaining > 0);
  }
}
