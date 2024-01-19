import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root{
   --color-main: #f3f3f3;
}

* {
   box-sizing: border-box;
   margin: 0;
   pad: 0;
   background-color: var(--color-main);
}

body{

}
`;

export default GlobalStyles;
