import React from 'react';
import ReactDOM from 'react-dom';
import CookiePolicyPopUp from './CookiePolicyPopUp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CookiePolicyPopUp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
