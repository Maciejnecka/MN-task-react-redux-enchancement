/* eslint-disable no-undef */
/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ExchangeRatesAPI from '../../api/ExchangeRatesAPI';
import { addCurrency } from '../../redux/actions/currencyActions';
import exchangeIcon from '../../Styles/icons/exchange.png';
import addIcon from '../../Styles/icons/add-button.png';
import { StyledTransactionForm, StyledShowFormButton, StyledTransactionModal } from './TransactionForm.styled';
import StyledTransactionList from '../TransactionList';
import validateFormFields from '../../utils/formValidator';

function TransactionForm() {
    const dispatch = useDispatch();
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [apiFetchedPrice, setApiFetchedPrice] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [total, setTotal] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [isFormVisible, setIsFormVisible] = useState(false);
    const formRef = useRef(null);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
        setFormErrors({});
        setSelectedCurrency('');
        setAmount('');
        setDate('');
        setPurchasePrice('');
        setTotal(0);
    };

    useEffect(() => {
        const abortController = new AbortController();
        const api = new ExchangeRatesAPI();
        api.getCurrencies(abortController.signal)
            .then((data) => {
                setCurrencies(Object.keys(data));
            })
            .catch((error) => console.error('Error fetching currencies', error));

        return () => abortController.abort();
    }, []);

    useEffect(() => {
        setTotal(amount * purchasePrice);
    }, [amount, purchasePrice]);

    const fetchRates = async (baseCurrency) => {
        const api = new ExchangeRatesAPI();
        try {
            const data = await api.getLatestRates(new AbortController().signal, baseCurrency);
            setApiFetchedPrice(data.rates[selectedCurrency]);
        } catch (error) {
            console.error('Error fetching latest rates', error);
        }
    };

    useEffect(() => {
        setPurchasePrice(apiFetchedPrice);
    }, [apiFetchedPrice]);

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (selectedCurrency) {
            fetchRates('USD');
        }
    }, [selectedCurrency, fetchRates]);

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
        setDate(today);
        if (date) {
            fetchRates('USD');
        }
    };

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);

        if (selectedCurrency) {
            const api = new ExchangeRatesAPI();
            api.getHistoricalRates(selectedDate, new AbortController().signal, 'USD')
                .then((data) => {
                    setPurchasePrice(data.rates[selectedCurrency]);
                })
                .catch((error) => console.error('Error fetching historical rates', error));
        }
    };

    const handlePurchasePriceChange = (e) => {
        setPurchasePrice(e.target.value);
    };

    useEffect(() => {
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
            const parsedTransactions = JSON.parse(storedTransactions);
            setTransactions(parsedTransactions);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            selectedCurrency,
            amount,
            date,
            purchasePrice,
        };

        const errors = validateFormFields(formData);

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            setIsFormVisible(false);
            const transaction = {
                id: uuidv4(),
                currency: selectedCurrency,
                amount: parseFloat(amount),
                date,
                purchasePrice: parseFloat(purchasePrice),
                total,
            };

            dispatch(addCurrency(transaction));

            setTransactions((prevTransactions) => [...prevTransactions, transaction]);

            const updatedTransactions = [...transactions, transaction];
            localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

            setSelectedCurrency('');
            setAmount('');
            setDate('');
            setPurchasePrice('');
            setTotal(0);
        } else {
            setFormErrors(errors);
        }
    };

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            setIsFormVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDeleteTransaction = (index) => {
        const updatedTransactions = [...transactions];
        updatedTransactions.splice(index, 1);

        setTransactions(updatedTransactions);

        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    };

    return (
        <>
            <StyledShowFormButton>
                <button type="button" className="exchange-form__show-form-button" onClick={toggleFormVisibility}>
                    <img className="exchange-form__show-form--icon" src={addIcon} alt="Exchange" /> Add transaction
                </button>
            </StyledShowFormButton>
            {isFormVisible && (
                <StyledTransactionModal className={`exchange-form__transaction-modal ${isFormVisible ? 'active' : ''}`}>
                    <StyledTransactionForm ref={formRef} onSubmit={handleSubmit}>
                        <select
                            className="exchange-form__select"
                            value={selectedCurrency}
                            onChange={(e) => handleCurrencyChange(e.target.value)}
                        >
                            <option value="" disabled>
                                Choose currency
                            </option>
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                        {formErrors.selectedCurrency && (
                            <div className="exchange-form__error-message">{formErrors.selectedCurrency}</div>
                        )}
                        <input
                            placeholder="Amount of currency"
                            className="exchange-form__input"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        {formErrors.amount && <div className="exchange-form__error-message">{formErrors.amount}</div>}
                        <input
                            className="exchange-form__date"
                            type="date"
                            value={date}
                            max={today}
                            onChange={(e) => handleDateChange(e.target.value)}
                        />
                        {formErrors.date && <div className="exchange-form__error-message">{formErrors.date}</div>}
                        <label className="exchange-form__label" htmlFor="purchasePrice">
                            USD <img className="exchange-form__icon" src={exchangeIcon} alt="Exchange" />{' '}
                            {selectedCurrency}
                            <input
                                className="exchange-form__input--price"
                                type="number"
                                value={purchasePrice}
                                onChange={handlePurchasePriceChange}
                            />
                        </label>
                        {formErrors.purchasePrice && (
                            <div className="exchange-form__error-message">{formErrors.purchasePrice}</div>
                        )}
                        <div className="exchange-form__total">
                            Total: {total.toFixed(2)} {selectedCurrency}
                        </div>
                        <button className="exchange-form__button" type="submit">
                            Add
                        </button>
                        <button type="button" className="exchange-form__close-button" onClick={toggleFormVisibility}>
                            Close window
                        </button>
                    </StyledTransactionForm>
                </StyledTransactionModal>
            )}
            <StyledTransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
        </>
    );
}

export default TransactionForm;
