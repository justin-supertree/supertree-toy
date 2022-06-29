import NextImage from 'next/image';
import styled from '@emotion/styled';
import { spacing, palette, Typography } from '@playdapp/ui';

import Mickey from '../../public/assets/icons/mickey-img.png';

const Loading = () => {
  const LoadingItemBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 30rem;
    margin-top: 5rem;
    gap: ${spacing.xl};

    button {
      color: ${palette.white};
      font-weight: 600;
      border-radius: 1.5rem;
    }
  `;

  return (
    <LoadingItemBlock>
      <NextImage
        src={Mickey}
        width={120}
        height={120}
        layout="fixed"
        alt="notice Alert"
      />

      <Typography type="h4" color="atlantic">
        Loading ...
      </Typography>
    </LoadingItemBlock>
  );
};

export default Loading;
