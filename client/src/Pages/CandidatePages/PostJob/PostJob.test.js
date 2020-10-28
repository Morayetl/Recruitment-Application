import React from 'react';
import ReactDOM from 'react-dom';
import PostJob from './PostJob';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PostJob />, div);
  ReactDOM.unmountComponentAtNode(div);
});
