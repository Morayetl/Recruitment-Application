import React from 'react';
import ReactDOM from 'react-dom';
import CandidateSideMenu from './CandidateSideMenu';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CandidateSideMenu />, div);
  ReactDOM.unmountComponentAtNode(div);
});
