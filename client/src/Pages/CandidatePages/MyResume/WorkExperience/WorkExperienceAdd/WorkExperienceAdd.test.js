import React from 'react';
import ReactDOM from 'react-dom';
import WorkExperienceAdd from './WorkExperienceAdd';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WorkExperienceAdd />, div);
  ReactDOM.unmountComponentAtNode(div);
});
