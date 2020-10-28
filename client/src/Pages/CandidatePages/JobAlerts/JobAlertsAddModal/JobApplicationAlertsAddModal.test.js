import React from 'react';
import ReactDOM from 'react-dom';
import JobApplicationAlertsAddModal from './JobApplicationAlertsAddModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JobApplicationAlertsAddModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
