import NextImage from 'next/image';
import styled from '@emotion/styled';
import { useMedia } from 'react-use';

import { breakpoints, palette, Button, Typography } from '@playdapp/ui';

import Logo from '../../../public/assets/icons/logo-blank.svg';
import Twitter from '../../../public/assets/icons/twitter.png';
import FaceBook from '../../../public/assets/icons/facebook.png';
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

  ${breakpoints.down('lg')} {
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

  ${breakpoints.down('lg')} {
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

  ${breakpoints.down('lg')} {
    display: flex;
    justify-content: space-between;
  }
`;

const FooterInfoText = styled.div`
  margin-top: 12px;

  ${breakpoints.down('lg')} {
    margin-top: 0;
  }
`;

const LinkContainer = styled.div`
  margin-top: 12px;

  ${breakpoints.down('lg')} {
    margin-top: 8px;
  }
`;

const Footer = () => {
  const isTablet = useMedia('(max-width: 1023px)', true);

  return (
    <Container>
      <div>
        <NextImage
          src={Logo}
          width={isTablet ? 106 : 142}
          height={isTablet ? 24 : 32}
          layout="fixed"
          alt="PlayDapp"
        />
        <FooterInfoText>
          <Typography type={isTablet ? 'p5' : 'p4'} color="black">
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
          <Typography type={isTablet ? 'p6' : 'p5'} color="gray700">
            © 2022. PlayDapp Limited All rights reserved.
          </Typography>
        </LinkContainer>
      </FooterContentArea>
    </Container>
  );
};

export default Footer;
