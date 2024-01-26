import { css } from 'styled-components';

const breakpoints = {
    small: '600px',
    medium: '950px',
    large: '1400px',
};

const media = {
    small: (...args) => css`
        @media (max-width: ${breakpoints.small}) {
            ${css(...args)}
        }
    `,
    medium: (...args) => css`
        @media (max-width: ${breakpoints.medium}) {
            ${css(...args)}
        }
    `,
    large: (...args) => css`
        @media (max-width: ${breakpoints.large}) {
            ${css(...args)}
        }
    `,
};

export default media;
