import React from 'react';
import ReactDOM from 'react-dom';
import ManageJobs from './ManageJobs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManageJobs />, div);
  ReactDOM.unmountComponentAtNode(div);
});
