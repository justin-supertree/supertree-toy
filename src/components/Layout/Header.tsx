import styled from '@emotion/styled';
import Link from 'next/link';

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  width: 100%;
  min-height: 80px;
  background-color: white;
  box-shadow: 0px 4px 8px 0px #1516190d;
  z-index: 1;
`;

const Header = () => {
  return (
    <Container>
      <Link href="/">
        <h1>Project Logo</h1>
      </Link>
      <h1>User Icon</h1>
    </Container>
  );
};

export default Header;
