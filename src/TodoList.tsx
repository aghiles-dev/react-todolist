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

  constructor (props: TodoListProps) {
    super(props);
    this.store.addTodo('hello');
    this.store.addTodo('Les gens');
    this.state = {
      todos: this.store.todos
    };
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
            return <TodoItem todo={todo} key={todo.id}/>;
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
