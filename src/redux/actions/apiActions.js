// src/redux/actions/apiActions.js
import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from './actionTypes';

export const apiCallRequest = () => ({ type: API_CALL_REQUEST });
export const apiCallSuccess = (data) => ({ type: API_CALL_SUCCESS, payload: data });
export const apiCallFailure = (error) => ({ type: API_CALL_FAILURE, payload: error });
