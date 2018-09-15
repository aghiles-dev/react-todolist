import * as React from 'react';
import { Todo } from './Interfaces';
import * as cx from 'classnames';
import { ChangeEvent } from 'react';

interface Props {
  todo: Todo;
  onToggle: (todo: Todo) => void;
}

interface State {}

export class TodoItem extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props);
  }

  render () {
    const { todo } = this.props;
    return (
      <li className="ui-state-default">
        <div className="checkbox">
          <label className={cx({ completed: todo.completed })}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={this.toggle}
            />
            {todo.title}
          </label>
        </div>
      </li>
    );
  }

  toggle = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.onToggle(this.props.todo);
  }
}
