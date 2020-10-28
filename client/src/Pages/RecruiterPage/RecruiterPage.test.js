import React from 'react';
import ReactDOM from 'react-dom';
import RecruiterPage from './RecruiterPages';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RecruiterPage/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
