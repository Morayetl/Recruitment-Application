import React from 'react';
import ReactDOM from 'react-dom';
import MyResume from './MyResume';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyResume />, div);
  ReactDOM.unmountComponentAtNode(div);
});
