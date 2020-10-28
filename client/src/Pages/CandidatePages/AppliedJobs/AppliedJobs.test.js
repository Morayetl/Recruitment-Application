import React from 'react';
import ReactDOM from 'react-dom';
import AppliedJobs from './AppliedJobs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppliedJobs />, div);
  ReactDOM.unmountComponentAtNode(div);
});
