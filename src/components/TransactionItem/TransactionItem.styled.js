import styled from 'styled-components';

const StyledTransactionItem = styled.li`
    display: grid;
    grid-template-columns: repeat(6, 1fr) auto;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    height: 80px;
    border-radius: 5px;

    & > span,
    & > button {
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .transaction-list__currency,
    .transaction-list__amount,
    .transaction-list__purchase-price,
    .transaction-list__current-rate,
    .transaction-list__total,
    .transaction-list__status,
    .transaction-list__delete-btn {
        padding: 5px;
    }

    .transaction-list__status--neutral {
        color: #999999;
    }

    .transaction-list__status--profit {
        color: #4caf50;
    }

    .transaction-list__status--loss {
        color: #f44336;
    }

    .transaction-list__delete-btn {
        background-color: #f44336;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 1.5vw;

        &:hover {
            background-color: #d32f2f;
        }
    }
`;

export default StyledTransactionItem;
