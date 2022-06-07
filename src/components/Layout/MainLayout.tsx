import React from 'react';

import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50rem;
  border: 1px solid;
`;

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default MainLayout;
