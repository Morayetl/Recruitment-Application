import React from 'react';
import ReactDOM from 'react-dom';
import SearchCategory from './SearchCategory';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchCategory />, div);
  ReactDOM.unmountComponentAtNode(div);
});
