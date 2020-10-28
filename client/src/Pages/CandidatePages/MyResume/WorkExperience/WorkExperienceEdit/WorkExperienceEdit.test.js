import React from 'react';
import ReactDOM from 'react-dom';
import WorkExperienceEdit from './WorkExperienceEdit';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WorkExperienceEdit />, div);
  ReactDOM.unmountComponentAtNode(div);
});
