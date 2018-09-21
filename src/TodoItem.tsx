import * as React from 'react';
import { Todo } from './Interfaces';
import * as cx from 'classnames';
import { MouseEvent } from 'react';

interface Props {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onRemove: (todo: Todo) => void;
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
          <div className="container-fluid" style={{ padding: 0 }}>
            <div className="row">
              <div className="col-sm-11">
                <label className={cx({ completed: todo.completed })}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={this.toggle}
                  />
                  {todo.title}
                </label>
              </div>
              <div className="col-sm-1">
                <button
                  className="btn btn-default btn-xs"
                  onClick={this.remove}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }

  toggle = () => {
    this.props.onToggle(this.props.todo);
  }

  remove = (event: MouseEvent<HTMLButtonElement>) => {
    this.props.onRemove(this.props.todo);
  }
}
