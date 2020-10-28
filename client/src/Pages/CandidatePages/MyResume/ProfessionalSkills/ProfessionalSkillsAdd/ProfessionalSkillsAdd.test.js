import React from 'react';
import ReactDOM from 'react-dom';
import ProfessionalSkillsAdd from './ProfessionalSkillsAdd';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProfessionalSkillsAdd />, div);
  ReactDOM.unmountComponentAtNode(div);
});
