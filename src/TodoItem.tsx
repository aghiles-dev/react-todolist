import * as React from 'react';
import { Todo } from './Interfaces';
import * as cx from 'classnames';

interface Props {
  todo: Todo;
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
              onChange={() => true}
            />
            {todo.title}
          </label>
        </div>
      </li>
    );
  }
}
