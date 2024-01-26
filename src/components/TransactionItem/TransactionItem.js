/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledTransactionItem, StyledConfirmationDialog } from './TransactionItem.styled';

function TransactionItem({ transaction, onDelete, todayRates }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

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
        statusText = 'No changes';
        statusClass = 'transaction-list__status--neutral';
    } else if (amount >= 0) {
        statusText = `+${amount} $ (+${percentage}%)`;
        statusClass = 'transaction-list__status--profit';
    } else {
        statusText = `${amount} $ (${percentage}%)`;
        statusClass = 'transaction-list__status--loss';
    }

    const toggleConfirmation = () => {
        setShowConfirmation(!showConfirmation);
    };

    return (
        <>
            {showConfirmation && (
                <StyledConfirmationDialog>
                    <p className="transaction-list__delete-btn--question">
                        Are you sure you want to delete this position?
                    </p>
                    <div>
                        <button
                            type="button"
                            className="transaction-list__delete-btn--confirm"
                            onClick={() => onDelete(transaction.id)}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className="transaction-list__delete-btn--reject"
                            onClick={toggleConfirmation}
                        >
                            No
                        </button>
                    </div>
                </StyledConfirmationDialog>
            )}
            <StyledTransactionItem>
                <span className="transaction-list__currency">{transaction.currency}</span>
                <span className="transaction-list__amount">{transaction.amount} $</span>
                <span className="transaction-list__purchase-price">{transaction.purchasePrice.toFixed(3)}</span>
                <span className="transaction-list__current-rate">{todayRates[transaction.currency]?.toFixed(3)}</span>
                <span className="transaction-list__total">{currentValueUSD} $</span>
                <span className={`${statusClass} transaction-list__status`}>{statusText}</span>
                <button type="button" onClick={toggleConfirmation} className="transaction-list__delete-btn">
                    Delete
                </button>
            </StyledTransactionItem>
        </>
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
