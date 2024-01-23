/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import StyledTransactionList from './TransactionList.styled';
import ExchangeRatesAPI from '../../api/ExchangeRatesAPI';

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

    const calculateProfitOrLoss = (transaction) => {
        const currentRate = todayRates[transaction.currency];
        if (!currentRate) return { amount: 'N/A', percentage: 'N/A' };

        const profitLossAmount = (currentRate - transaction.purchasePrice) * transaction.amount;
        const profitLossPercentage = (profitLossAmount / (transaction.purchasePrice * transaction.amount)) * 100;

        const currentValueUSD = profitLossAmount + transaction.amount;

        return {
            amount: profitLossAmount.toFixed(2),
            percentage: profitLossPercentage.toFixed(2),
            currentValueUSD: currentValueUSD.toFixed(2),
            isZero: profitLossAmount === 0,
        };
    };

    return (
        <StyledTransactionList className="transaction-list">
            <h2 className="transaction-list__title">Transaction List</h2>
            <ul className="transaction-list__items">
                {transactions.map((transaction, index) => {
                    const { amount, percentage } = calculateProfitOrLoss(transaction);
                    const statusClass =
                        amount >= 0 ? 'transaction-list__status--profit' : 'transaction-list__status--loss';
                    return (
                        <li key={uuidv4()} className="transaction-list__item">
                            <div className="transaction-list__details">
                                <p className="transaction-list__currency">Currency: {transaction.currency}</p>
                                <p className="transaction-list__amount">Amount: {transaction.amount} $</p>
                                <p className="transaction-list__date">Date: {transaction.date}</p>
                            </div>
                            <div className="transaction-list__pricing">
                                <p className="transaction-list__purchase-price">
                                    Purchase Rate: {transaction.purchasePrice}
                                </p>
                                <p className="transaction-list__current-rate">
                                    Current Rate: {todayRates[transaction.currency]}
                                </p>
                                <p className="transaction-list__total">
                                    Current value: {calculateProfitOrLoss(transaction).currentValueUSD} $
                                </p>
                            </div>
                            <div className="transaction-list__status-container">
                                <span className={`${statusClass} transaction-list__status`}>
                                    {amount >= 0
                                        ? `Profit: ${amount} $ (+${percentage}%)`
                                        : `Loss: ${amount} $ (${percentage}%)`}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => onDelete(index)}
                                className="transaction-list__delete-btn"
                            >
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>
        </StyledTransactionList>
    );
}

TransactionList.propTypes = {
    transactions: PropTypes.arrayOf(
        PropTypes.shape({
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
