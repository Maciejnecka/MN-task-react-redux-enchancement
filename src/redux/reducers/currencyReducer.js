/* eslint-disable default-param-last */
/* eslint-disable indent */
import { ADD_CURRENCY, UPDATE_CURRENCY, REMOVE_CURRENCY } from '../actions/actionTypes';

const initialState = {
    currencies: [],
};

const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CURRENCY:
            return { ...state, currencies: [...state.currencies, action.payload] };
        case UPDATE_CURRENCY:
            return {
                ...state,
                currencies: state.currencies.map((currency) =>
                    currency.id === action.payload.id ? action.payload : currency,
                ),
            };
        case REMOVE_CURRENCY:
            return { ...state, currencies: state.currencies.filter((currency) => currency.id !== action.payload) };
        default:
            return state;
    }
};

export default currencyReducer;
