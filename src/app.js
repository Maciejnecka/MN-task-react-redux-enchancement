/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './components/App';

const root = createRoot(document.querySelector('#root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
