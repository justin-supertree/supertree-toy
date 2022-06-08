import React from 'react';

import styled from '@emotion/styled';

const Container = styled.div`
  min-height: 50rem;
  height: 100%;
  margin-top: 8rem;
  padding: 5rem 0;
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
