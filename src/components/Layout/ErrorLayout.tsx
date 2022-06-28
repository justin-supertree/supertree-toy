import React from 'react';
import styled from '@emotion/styled';

import { ErrorContainer } from 'styles/error';

const Container = styled.div`
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 32px 0 5rem 0;
  z-index: 0;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

type Props = {
  children: React.ReactNode;
};

const ErrorLayout = ({ children }: Props) => {
  return (
    <ErrorContainer>
      <Container>{children} </Container>
    </ErrorContainer>
  );
};
export default ErrorLayout;
