import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  text-align: center;
  background-color: red;
`;

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
