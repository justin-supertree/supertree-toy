import styled from '@emotion/styled';
import { breakpoints, palette, Button } from '@playdapp/ui';

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 10rem;
  height: 100%;
  background-color: ${palette.gray200};
`;

const Footer = () => {
  return (
    <Container>
      <h1>Here is Footer Area</h1>
    </Container>
  );
};

export default Footer;
