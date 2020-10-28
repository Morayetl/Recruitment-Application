import React from 'react';
import ReactDOM from 'react-dom';
import EmployerTransactions from './EmployerTransactions';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EmployerTransactions />, div);
  ReactDOM.unmountComponentAtNode(div);
});
