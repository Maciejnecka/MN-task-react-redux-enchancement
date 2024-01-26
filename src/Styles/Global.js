import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root{
   --color-main: #e8eff4;
}

* {
   box-sizing: border-box;
   margin: 0;
   pad: 0;
   background: var(--color-main);
}
`;

export default GlobalStyles;
