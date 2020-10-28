import React from 'react';
import ReactDOM from 'react-dom';
import SearchJobType from './SearchJobType';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchJobType />, div);
  ReactDOM.unmountComponentAtNode(div);
});
