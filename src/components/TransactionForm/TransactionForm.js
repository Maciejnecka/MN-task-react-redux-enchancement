/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ExchangeRatesAPI from '../../api/ExchangeRatesAPI';
import { addCurrency } from '../../redux/actions/currencyActions';

function TransactionForm() {
    const dispatch = useDispatch();
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [total, setTotal] = useState(0);

    const today = new Date().toISOString().split('T')[0];

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
            setPurchasePrice(data.rates[selectedCurrency]);
        } catch (error) {
            console.error('Error fetching latest rates', error);
        }
    };

    useEffect(() => {
        if (selectedCurrency) {
            fetchRates('USD');
        }
    }, [selectedCurrency]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const transaction = { currency: selectedCurrency, amount, date, purchasePrice, total };
        dispatch(addCurrency(transaction));
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={selectedCurrency} onChange={(e) => handleCurrencyChange(e.target.value)}>
                {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="date" value={date} max={today} onChange={(e) => handleDateChange(e.target.value)} />
            <input type="number" value={purchasePrice} onChange={handlePurchasePriceChange} />
            <div>Total: {total.toFixed(2)}</div>
            <button type="submit">Add Transaction</button>
        </form>
    );
}

export default TransactionForm;
