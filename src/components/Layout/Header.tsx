import NextImage from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { breakpoints } from '@playdapp/ui';
import { useMedia } from 'react-use';

import Logo from '../../../public/assets/icons/header-logo.svg';
import LogoM from '../../../public/assets/icons/header-logo-m.png';
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

const ImageBlock = styled.div`
  cursor: pointer;
`;

const Header = () => {
  const isMobile = useMedia('(max-width: 752px)', true);

  return (
    <Container>
      <Link href="/">
        <ImageBlock>
          {isMobile ? (
            <NextImage
              src={LogoM}
              width={58}
              height={46}
              layout="fixed"
              alt="PlayDapp"
            />
          ) : (
            <NextImage
              src={Logo}
              width={213}
              height={48}
              layout="fixed"
              alt="PlayDapp"
            />
          )}
        </ImageBlock>
      </Link>

      <ImageBlock>
        <NextImage
          src={User}
          width={40}
          height={40}
          layout="fixed"
          alt="user"
        />
      </ImageBlock>
    </Container>
  );
};

export default Header;
