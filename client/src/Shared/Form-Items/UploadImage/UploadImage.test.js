import React from 'react';
import ReactDOM from 'react-dom';
import UploadImage from './UploadImage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UploadImage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
