import React from 'react';
import ReactDOM from 'react-dom';
import EducationAdd from './EducationAdd';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EducationAdd />, div);
  ReactDOM.unmountComponentAtNode(div);
});
