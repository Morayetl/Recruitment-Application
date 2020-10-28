import React from 'react';
import ReactDOM from 'react-dom';
import TopCategories from './TopCategories';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TopCategories />, div);
  ReactDOM.unmountComponentAtNode(div);
});
