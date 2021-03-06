import styled from '@emotion/styled';

import { breakpoints } from '@playdapp/ui';

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: calc(1410px + 6rem);
  height: 100%;
  min-height: 50rem;
  margin: 0 auto;
  padding: 5rem 3rem 0 3rem;

  ${breakpoints.down('lg')} {
    padding: 5rem 2rem 0 2rem;
  }

  ${breakpoints.down('md')} {
    padding: 5rem 1.5rem 0 1.5rem;
  }
`;
