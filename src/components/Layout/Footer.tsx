import styled from '@emotion/styled';

import { breakpoints, palette, Button } from '@playdapp/ui';

const FlexMixin = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-height: 117px;
  height: 100%;
  background-color: ${palette.gray200};
`;

const FooterContentArea = styled(FlexMixin)`
  justify-content: center;
  width: 231px;
  height: 100%;
  border: 1px solid;
`;

// const RightArea = styled(FlexMixin)`
//   width: 265px;
//   height: 100%;
//   border: 1px solid;
// `;

const Footer = () => {
  return (
    <Container>
      <FooterContentArea>LeftArea</FooterContentArea>
      <FooterContentArea>RightArea</FooterContentArea>
    </Container>
  );
};

export default Footer;
