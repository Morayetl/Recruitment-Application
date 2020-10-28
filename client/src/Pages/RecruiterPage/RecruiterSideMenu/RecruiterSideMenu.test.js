import React from 'react';
import ReactDOM from 'react-dom';
import RecruiterSideMenu from './RecruiterSideMenu';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RecruiterSideMenu />, div);
  ReactDOM.unmountComponentAtNode(div);
});
