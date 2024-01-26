/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import StyledTransactionItem from './TransactionItem.styled';

function TransactionItem({ transaction, onDelete, todayRates }) {
    const calculateProfitOrLoss = (transactions) => {
        const currentRate = todayRates[transaction.currency];
        if (!currentRate) {
            return { amount: 'N/A', percentage: 'N/A', currentValueUSD: 'N/A' };
        }

        const initialValuePLN = transactions.purchasePrice * transactions.amount;
        const currentValuePLN = currentRate * transactions.amount;
        const profitLossPLN = currentValuePLN - initialValuePLN;
        const profitLossUSD = profitLossPLN / currentRate;
        const currentValueUSD = transactions.amount + profitLossUSD;
        const profitLossPercentage = (profitLossUSD / transactions.amount) * 100;

        return {
            amount: profitLossUSD.toFixed(2),
            percentage: profitLossPercentage.toFixed(2),
            currentValueUSD: currentValueUSD.toFixed(2),
            isZero: profitLossUSD === 0,
        };
    };

    const { amount, percentage, currentValueUSD, isZero } = calculateProfitOrLoss(transaction);
    let statusText;
    let statusClass;

    if (isZero) {
        statusText = 'No Profit or Loss';
        statusClass = 'transaction-list__status--neutral';
    } else if (amount >= 0) {
        statusText = `Profit: ${amount} $ (+${percentage}%)`;
        statusClass = 'transaction-list__status--profit';
    } else {
        statusText = `Loss: ${amount} $ (${percentage}%)`;
        statusClass = 'transaction-list__status--loss';
    }

    return (
        <StyledTransactionItem>
            <div className="transaction-list__details">
                <p className="transaction-list__currency">Currency: {transaction.currency}</p>
                <p className="transaction-list__amount">Amount: {transaction.amount} $</p>
                <p className="transaction-list__date">Date: {transaction.date}</p>
            </div>
            <div className="transaction-list__pricing">
                <p className="transaction-list__purchase-price">Purchase Rate: {transaction.purchasePrice}</p>
                <p className="transaction-list__current-rate">Current Rate: {todayRates[transaction.currency]}</p>
                <p className="transaction-list__total">Current value: {currentValueUSD} $</p>
            </div>
            <div className="transaction-list__status-container">
                <span className={`${statusClass} transaction-list__status`}>{statusText}</span>
            </div>
            <button type="button" onClick={() => onDelete(transaction.id)} className="transaction-list__delete-btn">
                Delete
            </button>
        </StyledTransactionItem>
    );
}

TransactionItem.propTypes = {
    transaction: PropTypes.shape({
        id: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        purchasePrice: PropTypes.number.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    todayRates: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default TransactionItem;
