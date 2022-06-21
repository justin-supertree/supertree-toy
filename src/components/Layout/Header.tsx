import NextImage from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import {
  breakpoints,
  spacing,
  palette,
  Button,
  Typography,
} from '@playdapp/ui';

import Logo from '../../../public/assets/icons/header-logo.svg';
import User from '../../../public/assets/icons/user.png';

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  width: 100%;
  min-height: 80px;
  padding: 0 48px;
  background-color: white;
  box-shadow: 0px 4px 8px 0px #1516190d;
  z-index: 1;

  ${breakpoints.down('md')} {
    min-height: 64px;
    padding: 0 24px;
  }
`;

const Header = () => {
  return (
    <Container>
      <Link href="/">
        <NextImage
          src={Logo}
          width={213}
          height={48}
          layout="fixed"
          alt="PlayDapp"
        />
      </Link>

      <NextImage src={User} width={40} height={40} layout="fixed" alt="user" />
    </Container>
  );
};

export default Header;
