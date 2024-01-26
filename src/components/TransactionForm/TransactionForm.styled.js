import styled from 'styled-components';

export const StyledTransactionForm = styled.form`
    background: white;
    padding: 20px;
    width: 50%;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 10px;

    .exchange-form__select,
    .exchange-form__date,
    .exchange-form__input,
    .exchange-form__input--price {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        background-color: #f9f9f9;
        transition: border-color 0.3s;
        text-align: center;
    }

    .exchange-form__input--price {
        width: 30%;
    }
    .exchange-form__select:hover,
    .exchange-form__date:hover,
    .exchange-form__input:hover,
    .exchange-form__input--price:hover {
        border-color: #2193b0;
    }

    .exchange-form__error-message {
        color: #f44336;
        font-size: 0.8rem;
        text-align: center;
        font-weight: bold;
        margin-top: -8px;
        margin-bottom: 10px;
        border-radius: 5px;
        padding: 5px;
    }

    .exchange-form__label {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        border-radius: 5px;
        padding: 5px;
    }

    .exchange-form__icon {
        height: 20px;
        width: 20px;
    }

    .exchange-form__total {
        font-weight: bold;
        margin-top: 10px;
        border-radius: 5px;
        padding: 5px;
    }

    .exchange-form__button {
        background: linear-gradient(185deg, #6dd5ed 0%, #2193b0 100%);
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
    }

    .exchange-form__button:hover {
        background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
        transform: scale(1.05);
    }

    .exchange-form__close-button {
        background-color: #f44336;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
    }

    .exchange-form__close-button:hover {
        background-color: #d32f2f;
        transform: scale(1.05);
    }
`;

export const StyledShowFormButton = styled.div`
    max-width: 1440px;
    width: 95%;
    margin: 2rem auto;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: #f4f7fa;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

    .exchange-form__show-form-button {
        display: inline-flex;
        align-items: center;
        padding: 10px 20px;
        background: linear-gradient(185deg, #6dd5ed 0%, #2193b0 100%);
        color: white;
        border: 1px solid transparent;
        border-radius: 20px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
        font-weight: 500;
        font-size: 24px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        white-space: nowrap;
    }

    .exchange-form__show-form-button:hover {
        background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
        transform: scale(1.05);
    }

    .exchange-form__show-form--icon {
        height: 35px;
        width: 35px;
        margin-right: 10px;
        background: transparent;
    }
`;

export const StyledTransactionModal = styled.div`
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    justify-content: center;
    align-items: center;

    &.active {
        display: flex;
    }
`;
