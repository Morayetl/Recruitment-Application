import React from 'react';
import ReactDOM from 'react-dom';
import EducationEdit from './EducationEdit';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EducationEdit />, div);
  ReactDOM.unmountComponentAtNode(div);
});
