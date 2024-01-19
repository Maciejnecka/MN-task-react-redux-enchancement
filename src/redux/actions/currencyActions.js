import { ADD_CURRENCY, UPDATE_CURRENCY, REMOVE_CURRENCY } from './actionTypes';

export const addCurrency = (currency) => ({ type: ADD_CURRENCY, payload: currency });
export const updateCurrency = (currency) => ({ type: UPDATE_CURRENCY, payload: currency });
export const removeCurrency = (id) => ({ type: REMOVE_CURRENCY, payload: id });
