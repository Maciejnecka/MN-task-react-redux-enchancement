import styled from 'styled-components';
import media from '../../Styles/mediaQueries';

const StyledTransactionList = styled.div`
    max-width: 1440px;
    width: 85%;
    margin: 0 auto;
    display: block;
    overflow-x: auto;
    border-bottom: 20px solid #2193b0;
    border-radius: 5px;

    .transaction-list__title {
        color: #2193b0;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
    }

    .transaction-list__header-container {
        padding-inline-start: 0;
        width: 100%;
        grid-gap: -5px;
    }
    .transaction-list__header {
        display: grid;
        grid-template-columns: repeat(6, 1fr) auto;
        font-weight: bold;
        color: #2193b0;
        padding: 20px;
        background-color: #f4f7fa;
        border-bottom: 2px solid #ccc;
        border-radius: 5px;
    }

    .transaction-list__header > span {
        text-align: center;
        padding: 5px;
        border-radius: 5px;
        font-size: 2rem;
    }

    .transaction-list__items {
        list-style: none;
        padding: 0;
        margin: 0 auto;
        background-color: #2193b0;
        border-radius: 5px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        padding: 20px;
        max-height: 600px;
        overflow-y: auto;
        font-size: 2rem;

        > li:not(:last-child) {
            margin-bottom: 10px;
        }
        &::-webkit-scrollbar {
            width: 10px;
        }

        &::-webkit-scrollbar-track {
            background: #f4f7fa;
            border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb {
            background: #2193b0;
            border-radius: 10px;
            border: 3px solid #f4f7fa;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #1e819b;
        }
    }
    ${media.large`
        .transaction-list__header > span {
        font-size: 1.15rem;
        }
        .transaction-list__items {
            font-size: 1.15rem;
        }
       
    `}
    ${media.medium`
        .transaction-list__header > span {
        font-size: 0.9rem;
        }
        .transaction-list__items {
            font-size: 0.9rem;
        }
       
    `}
      ${media.small`
        .transaction-list__header > span {
        font-size: 0.6rem;
        }
        .transaction-list__items {
            font-size: 0.6rem;
        }
       
    `}
`;

export default StyledTransactionList;
