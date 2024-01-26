import styled from 'styled-components';
import media from '../../Styles/mediaQueries';

export const StyledTransactionItem = styled.li`
    display: grid;
    grid-template-columns: repeat(6, 1fr) auto;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    height: min-content;
    min-height: 100px;
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
        font-size: 1.75rem;

        &:hover {
            background-color: #d32f2f;
        }
    }

    ${media.large`
        .transaction-list__delete-btn {
        font-size: 1.15rem;
        }
       
    `}
    ${media.medium`
         min-height: 0;
         height: 75px;
        .transaction-list__delete-btn {
        font-size: 0.9rem;
        }
    `}
    ${media.small`
         min-height: 0;
         height: 60px;
       .transaction-list__delete-btn {
        font-size: 0.7rem;
        }
    `}
`;

export const StyledConfirmationDialog = styled.div`
    background: #e8eff4;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-bottom: -5px;

    & > div {
        display: flex;
        background: #e8eff4;
        justify-content: space-around;
        margin-top: 20px;
    }

    button {
        background: #e8eff4;
        border: none;
        border-radius: 5px;
        padding: 10px 30px;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 1.75rem;
    }
    .transaction-list__delete-btn--question {
        margin: 0 auto;
        text-align: center;
        background-color: #e8eff4;
    }
    .transaction-list__delete-btn--confirm {
        background-color: #4caf50;
        color: white;

        &:hover {
            background-color: #388e3c;
        }
    }

    .transaction-list__delete-btn--reject {
        background-color: #f44336;
        color: white;

        &:hover {
            background-color: #d32f2f;
        }
    }

    ${media.large`
        .transaction-list__delete-btn--reject,
        .transaction-list__delete-btn--confirm  {
        font-size: 1.15rem;
        padding: 10px 30px;

        }
       
    `}
    ${media.medium`
        .transaction-list__delete-btn--reject,
        .transaction-list__delete-btn--confirm {
        font-size: 0.9rem;
        padding: 8px 24px;

        }
    `}
    ${media.small`
    .transaction-list__delete-btn--reject,
    .transaction-list__delete-btn--confirm {
        font-size: 0.7rem;
        padding: 5px 15px;

        }
    `}
`;
