import React from 'react';
import ReactDOM from 'react-dom';
import JobSearchForm from './JobSearchForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JobSearchForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
