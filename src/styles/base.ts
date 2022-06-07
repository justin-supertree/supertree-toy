import { css } from '@emotion/react';
import { palette } from '@playdapp/ui';

const base = css`
  html,
  body,
  #__next {
    height: 100%;
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
    background-color: ${palette.primary600};
    height: 3px;
  }
  #nprogress .peg {
    box-shadow: 0 0 10px ${palette.primary600}, 0 0 5px ${palette.primary600};
  }
`;

export default base;
