import NextImage from 'next/image';
import styled from '@emotion/styled';
import Link from 'next/link';

import { breakpoints, palette, Button, Typography } from '@playdapp/ui';

import Logo from '../../../public/assets/icons/logo-blank.svg';
import Twitter from '../../../public/assets/icons/twitter.png';
import FaceBook from '../../../public/assets/icons/telegram.png';
import Telegram from '../../../public/assets/icons/telegram.png';
import Mail from '../../../public/assets/icons/mail.png';
import Discord from '../../../public/assets/icons/discord.png';

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-height: 117px;
  height: 100%;
  padding: 0 80px;
  background-color: ${palette.gray200};
`;

const FooterContentArea = styled.div`
  text-align: right;

  & > span {
    margin: 0 8px;
  }
`;

const LinkContainer = styled.div``;

const Footer = () => {
  return (
    <Container>
      <div>
        <NextImage
          src={Logo}
          width={142}
          height={32}
          layout="fixed"
          alt="PlayDapp"
        />
        <div>
          <Typography type="b3" color="black">
            The Premier Marketplace for NFTs
          </Typography>
        </div>
      </div>

      <FooterContentArea>
        <NextImage
          src={FaceBook}
          width={32}
          height={32}
          layout="fixed"
          alt="PlayDapp"
        />
        <NextImage
          src={Twitter}
          width={32}
          height={32}
          layout="fixed"
          alt="PlayDapp"
        />
        <NextImage
          src={Telegram}
          width={32}
          height={32}
          layout="fixed"
          alt="PlayDapp"
        />
        <NextImage
          src={Mail}
          width={32}
          height={32}
          layout="fixed"
          alt="PlayDapp"
        />
        <NextImage
          src={Discord}
          width={32}
          height={32}
          layout="fixed"
          alt="PlayDapp"
        />

        <LinkContainer>
          <Typography type="b3" color="gray700">
            © 2022. PlayDapp Limited All rights reserved.
          </Typography>
        </LinkContainer>
      </FooterContentArea>
    </Container>
  );
};

export default Footer;
