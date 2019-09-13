import React from 'react';
import ReactDOM from 'react-dom';
import MessageBox from './MessageBox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MessageBox />, div);
  ReactDOM.unmountComponentAtNode(div);
});
