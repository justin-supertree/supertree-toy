import NextImage from 'next/image';
import styled from '@emotion/styled';
import {
  breakpoints,
  spacing,
  palette,
  Button,
  Typography,
} from '@playdapp/ui';

import Error from '../../public/assets/icons/error.png';

const EmptyItemBlock = styled.div`
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

type Props = { tab: string };

const Empty = ({ tab }: Props) => {
  return (
    <EmptyItemBlock>
      <NextImage
        src={Error}
        width={120}
        height={120}
        layout="fixed"
        alt="notice Alert"
      />

      <Typography type="h4" color="atlantic">
        No Data in Notice {tab} Table.
      </Typography>
    </EmptyItemBlock>
  );
};

export default Empty;
