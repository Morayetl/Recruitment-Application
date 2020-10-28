import React from 'react';
import ReactDOM from 'react-dom';
import ProfessionalSkillsEdit from './ProfessionalSkillsEdit';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProfessionalSkillsEdit />, div);
  ReactDOM.unmountComponentAtNode(div);
});
