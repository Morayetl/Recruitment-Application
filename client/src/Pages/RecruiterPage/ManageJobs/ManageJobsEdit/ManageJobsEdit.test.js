import React from 'react';
import ReactDOM from 'react-dom';
import ManageJobsEdit from './ManageJobsEdit';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManageJobsEdit />, div);
  ReactDOM.unmountComponentAtNode(div);
});
