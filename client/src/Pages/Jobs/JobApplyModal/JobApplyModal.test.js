import React from 'react';
import ReactDOM from 'react-dom';
import JobApplyModal from './JobApplyModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JobApplyModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
