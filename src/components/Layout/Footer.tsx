import NextImage from 'next/image';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useMedia } from 'react-use';

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
  padding: 24px 80px;
  background-color: ${palette.gray200};

  ${breakpoints.down('md')} {
    display: block;
    padding: 1rem 0;
    text-align: center;
  }
`;

const FooterContentArea = styled.div`
  text-align: right;
  text-align: -webkit-right;

  & > span {
    margin: 0 8px;
  }

  ${breakpoints.down('md')} {
    max-width: 228px;
    margin: auto;
    margin-top: 12px;
    text-align: center;
  }
`;

const FooterImageBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 224px;

  ${breakpoints.down('md')} {
    display: flex;
    justify-content: space-between;
  }
`;

const FooterInfoText = styled.div`
  margin-top: 1rem;

  ${breakpoints.down('md')} {
    margin-top: 12px;
  }
`;

const LinkContainer = styled.div`
  margin-top: 24px;

  ${breakpoints.down('md')} {
    margin-top: 16px;
  }
`;

const Footer = () => {
  const isMobile = useMedia('(max-width: 752px)', true);

  return (
    <Container>
      <div>
        <NextImage
          src={Logo}
          width={isMobile ? 106 : 142}
          height={isMobile ? 24 : 32}
          layout="fixed"
          alt="PlayDapp"
        />
        <FooterInfoText>
          <Typography type={isMobile ? 'p5' : 'b3'} color="black">
            The Premier Marketplace for NFTs
          </Typography>
        </FooterInfoText>
      </div>

      <FooterContentArea>
        <FooterImageBlock>
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
        </FooterImageBlock>

        <LinkContainer>
          <Typography type={isMobile ? 'p6' : 'b3'} color="gray700">
            © 2022. PlayDapp Limited All rights reserved.
          </Typography>
        </LinkContainer>
      </FooterContentArea>
    </Container>
  );
};

export default Footer;
