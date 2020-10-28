import React from 'react';
import ReactDOM from 'react-dom';
import ConfirmEmail from './ConfirmEmail';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConfirmEmail />, div);
  ReactDOM.unmountComponentAtNode(div);
});
