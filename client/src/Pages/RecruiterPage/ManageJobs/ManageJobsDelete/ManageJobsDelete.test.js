import React from 'react';
import ReactDOM from 'react-dom';
import ManageJobsDelete from './ManageJobsDelete';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManageJobsDelete />, div);
  ReactDOM.unmountComponentAtNode(div);
});
