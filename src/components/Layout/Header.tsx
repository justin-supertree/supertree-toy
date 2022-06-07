import styled from '@emotion/styled';

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  min-height: 8rem;
  background-color: lightgreen;
  z-index: 1;
`;

const Header = () => {
  return <Container>Here is Header Area</Container>;
};

export default Header;
