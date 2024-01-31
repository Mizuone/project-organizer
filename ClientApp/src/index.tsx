import './index.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { makeServer } from './tests/mirageServer';
import reportWebVitals from './reportWebVitals';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') ?? "";
const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

/* To locally with the external API: 
  - Set REACT_APP_USEMOCKAPI to true
  - npm start in ClientApp
*/
if (process.env.NODE_ENV === "development" && process.env.REACT_APP_USEMOCKAPI === 'true') {
  makeServer({ environment: 'development' });
}

root.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(undefined);
