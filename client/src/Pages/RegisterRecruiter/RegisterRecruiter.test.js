import React from 'react';
import ReactDOM from 'react-dom';
import RegisterRecruiter from './RegisterRecruiter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegisterRecruiter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
