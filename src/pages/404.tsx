import styled from '@emotion/styled';
import { NextPage } from 'next';
import Link from 'next/link';
import NextImage from 'next/image';
import { Button, Typography } from '@playdapp/ui';

import ErrorLayout from '@/components/Layout/ErrorLayout';
import MetaTag from '@/components/MetaTag';

import Error from '../../public/assets/icons/error.png';

const NotFoundPage: NextPage = () => {
  const TextArea = styled.div`
    margin: 16px 0;
  `;

  return (
    <>
      <MetaTag title="404 Page : PlayDapp Notice" />
      <ErrorLayout>
        <NextImage
          src={Error}
          width={160}
          height={160}
          layout="fixed"
          alt="notice Alert"
        />

        <TextArea>
          <Typography type="h3">
            You have something wrong.. (404 Error)
          </Typography>
        </TextArea>

        <Link href="/">
          <Button>Go Back to Home</Button>
        </Link>
      </ErrorLayout>
    </>
  );
};

export default NotFoundPage;
