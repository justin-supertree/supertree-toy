import React from 'react';

import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70rem;
  height: 100%;
  margin-top: 8rem;
  border: 1px solid;
  z-index: 0;
`;

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default MainLayout;
