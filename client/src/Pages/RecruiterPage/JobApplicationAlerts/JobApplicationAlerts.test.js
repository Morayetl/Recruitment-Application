import React from 'react';
import ReactDOM from 'react-dom';
import JobApplicationAlerts from './JobApplicationAlerts';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JobApplicationAlerts />, div);
  ReactDOM.unmountComponentAtNode(div);
});
