import React from 'react';
import ReactDOM from 'react-dom';
import JobAlerts from './JobAlerts';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JobAlerts />, div);
  ReactDOM.unmountComponentAtNode(div);
});
