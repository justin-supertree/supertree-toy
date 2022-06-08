import { css } from '@emotion/react';

const base = css`
  html,
  body,
  #__next {
    /* height: 100%; */
    padding: 0;
    margin: 0;
    font-family: hero-new, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  #nprogress .bar {
    height: 3px;
  }
  #nprogress .peg {
  }
`;

export default base;
