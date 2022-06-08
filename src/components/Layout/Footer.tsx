import styled from '@emotion/styled';

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 20rem;
  height: 100%;
  background-color: yellow;
`;

const Footer = () => {
  return (
    <Container>
      <h1>Here is Footer Area</h1>
    </Container>
  );
};

export default Footer;
