/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

function TransactionList({ transactions, onDelete }) {
    return (
        <div>
            <h2>Transaction List</h2>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={uuidv4()}>
                        Currency: {transaction.currency}, Amount: {transaction.amount}, Date: {transaction.date},
                        Purchase Price: {transaction.purchasePrice}, Total: {transaction.total}
                        <button type="button" onClick={() => onDelete(index)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
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
        }),
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TransactionList;
