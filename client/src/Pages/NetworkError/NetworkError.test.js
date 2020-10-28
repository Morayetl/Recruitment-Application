import React from 'react';
import ReactDOM from 'react-dom';
import NetworkError from './NetworkError';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NetworkError />, div);
  ReactDOM.unmountComponentAtNode(div);
});
