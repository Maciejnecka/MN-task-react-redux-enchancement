/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../Styles/Global';
import GlobalFonts from '../Styles/fonts/GlobalFonts';
import theme from '../Styles/theme';
import TransactionForm from './TransactionForm';

const App = function () {
    return (
        <>
            <GlobalStyles />
            <GlobalFonts />
            <ThemeProvider theme={theme}>
                <TransactionForm />
            </ThemeProvider>
        </>
    );
};

export default App;
