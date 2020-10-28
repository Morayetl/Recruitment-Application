import React from 'react';
import ReactDOM from 'react-dom';
import LoginModal from './LoginModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
