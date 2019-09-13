import React from 'react';
import ReactDOM from 'react-dom';
import signUp from './signUp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<signUp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
