/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StyledTransactionList from './TransactionList.styled';
import ExchangeRatesAPI from '../../api/ExchangeRatesAPI';
import StyledTransactionItem from '../TransactionItem';

function TransactionList({ transactions, onDelete }) {
    const [todayRates, setTodayRates] = useState({});

    useEffect(() => {
        const uniqueCurrencies = [...new Set(transactions.map((t) => t.currency))];
        const api = new ExchangeRatesAPI();
        const signal = new AbortController().signal;

        Promise.all(
            uniqueCurrencies.map((currency) =>
                api.getTodayRate(signal, currency).then((data) => ({ currency, rate: data.rates[currency] })),
            ),
        ).then((ratesArray) => {
            const rates = ratesArray.reduce((acc, curr) => {
                acc[curr.currency] = curr.rate;
                return acc;
            }, {});
            setTodayRates(rates);
        });
    }, [transactions]);

    return (
        <StyledTransactionList>
            <h2 className="transaction-list__title">Transaction List</h2>
            <ul className="transaction-list__header-container">
                <li className="transaction-list__header">
                    <span>Currency</span>
                    <span>Amount</span>
                    <span>Purchase price</span>
                    <span>Current price</span>
                    <span>Total</span>
                    <span>Loss or Profit</span>
                    <span>Action</span>
                </li>
            </ul>
            <ul className="transaction-list__items">
                {transactions.map((transaction, index) => (
                    <StyledTransactionItem
                        key={transaction.id}
                        transaction={transaction}
                        onDelete={() => onDelete(index)}
                        todayRates={todayRates}
                    />
                ))}
            </ul>
        </StyledTransactionList>
    );
}

TransactionList.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            currency: PropTypes.string.isRequired,
            amount: PropTypes.number,
            date: PropTypes.string.isRequired,
            purchasePrice: PropTypes.number,
            total: PropTypes.number.isRequired,
            purchaseRate: PropTypes.number,
        }),
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TransactionList;
