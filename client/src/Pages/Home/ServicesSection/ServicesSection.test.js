import React from 'react';
import ReactDOM from 'react-dom';
import ServicesSection from './ServicesSection';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ServicesSection />, div);
  ReactDOM.unmountComponentAtNode(div);
});
