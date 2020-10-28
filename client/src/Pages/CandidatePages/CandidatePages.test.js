import React from 'react';
import ReactDOM from 'react-dom';
import CandidatePages from './CandidatePages';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CandidatePages/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
