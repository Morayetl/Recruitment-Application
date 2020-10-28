import React from 'react';
import ReactDOM from 'react-dom';
import CompanyProfileForm from './CompanyProfileForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CompanyProfileForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
