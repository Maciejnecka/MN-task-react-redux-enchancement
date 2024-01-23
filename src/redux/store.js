/* eslint-disable import/no-extraneous-dependencies */
// src/redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import currencyReducer from './reducers/currencyReducer';
import apiReducer from './reducers/apiReducer';

const rootReducer = combineReducers({
    currency: currencyReducer,
    api: apiReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
