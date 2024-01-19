/* eslint-disable import/no-extraneous-dependencies */
import { createGlobalStyle } from 'styled-components';

import RobotoMonoBold from './RobotoMonoBold.ttf';
import RobotoMonoLight from './RobotoMonoLight.ttf';
import RobotoMonoItalic from './RobotoMonoLightItalic.ttf';
import RobotoMonoRegular from './RobotoMonoRegular.ttf';

const fontFiles = [
    {
        family: 'RobotoRegular',
        ttf: RobotoMonoRegular,
    },
    {
        family: 'RobotoBold',
        ttf: RobotoMonoBold,
        style: 'bold',
    },
    {
        family: 'RobotoLight',
        ttf: RobotoMonoLight,
    },
    {
        family: 'RobotoItalic',
        ttf: RobotoMonoItalic,
        style: 'italic',
    },
];

const createFontFace = ({ family, ttf, style }) => `
  @font-face {
    font-family: '${family}';
    src: local('${family}'), url('${ttf}') format('truetype');
    font-style: ${style || 'normal'};
  }
`;

const GlobalFonts = createGlobalStyle`
  ${fontFiles.map(createFontFace).join('\n')}

body{
   font-family: 'RobotoRegular', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

export default GlobalFonts;
