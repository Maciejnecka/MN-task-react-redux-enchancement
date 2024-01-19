/* eslint-disable import/no-extraneous-dependencies */
// ./src/components/App.js
import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../Styles/Global';
import theme from '../Styles/theme';

const App = function () {
    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={theme}>
                <h1>Hello world</h1>
            </ThemeProvider>
        </>
    );
};

export default App;
