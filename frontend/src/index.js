import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);
