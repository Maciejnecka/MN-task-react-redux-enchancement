/* eslint-disable default-param-last */
/* eslint-disable indent */
// src/redux/reducers/apiReducer.js
import { API_CALL_REQUEST, API_CALL_SUCCESS, API_CALL_FAILURE } from '../actions/actionTypes';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const apiReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_CALL_REQUEST:
            return { ...state, loading: true, error: null };
        case API_CALL_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case API_CALL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default apiReducer;
