import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

if (rootElement.hasChildNodes()) {
  root.hydrate(<App />);
} else {
  root.render(<App />);
}
