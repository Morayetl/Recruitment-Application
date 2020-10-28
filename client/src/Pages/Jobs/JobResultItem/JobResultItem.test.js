import React from 'react';
import ReactDOM from 'react-dom';
import JobResultItem from './JobResultItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JobResultItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
