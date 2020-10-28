import React from 'react';
import ReactDOM from 'react-dom';
import SearchLocation from './SearchLocation';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchLocation />, div);
  ReactDOM.unmountComponentAtNode(div);
});
