import React from 'react';
import ReactDOM from 'react-dom';
import Attachments from './Attachments';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Attachments />, div);
  ReactDOM.unmountComponentAtNode(div);
});
