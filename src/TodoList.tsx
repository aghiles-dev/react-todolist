import * as React from 'react';
import { TodoStore } from './TodoStore';
import { Todo } from './Interfaces';
import { TodoItem } from './TodoItem';

interface TodoListProps {}

interface TodoListState {
  todos: Todo[];
}

export class TodoList extends React.Component<TodoListProps, TodoListState> {
  private store: TodoStore = new TodoStore();
  private toggleTodo: (todo: Todo) => void;

  constructor (props: TodoListProps) {
    super(props);
    this.state = {
      todos: []
    };
    this.store.onChange(store => {
      this.setState({ todos: this.store.todos });
    });

    this.toggleTodo = this.store.toggleTodo.bind(this.store);
  }

  componentDidMount () {
    this.store.addTodo('hello');
    this.store.addTodo('Les gens');
  }

  render () {
    const { todos } = this.state;
    return (
      <section className="todolist not-done">
        <h1>Todos</h1>
        <input
          type="text"
          className="form-control add-todo"
          placeholder="Add todo"
        />
        <button id="checkAll" className="btn btn-success">
          Mark all as done
        </button>

        <hr />

        <ul id="sortable" className="list-unstyled ui-sortable">
          {todos.map(todo => {
            return (
              <TodoItem todo={todo} key={todo.id} onToggle={this.toggleTodo} />
            );
          })}
        </ul>

        <div className="todo-footer">
          <strong>
            <span className="count-todos">{todos.length}</span>
          </strong>{' '}
          Items Left
        </div>
      </section>
    );
  }
}
