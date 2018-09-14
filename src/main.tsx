import * as React from 'react';
import { render } from 'react-dom';
import { TodoList } from './TodoList';

render(
  <div className="container">
    <div className="row">
      <div className="col-sm-6 col-sm-offset-3">
        <TodoList />
      </div>
    </div>
  </div>,
  document.getElementById('app') as Element
);
