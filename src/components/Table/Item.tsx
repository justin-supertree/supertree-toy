import Link from 'next/link';
import styled from '@emotion/styled';
import { Typography } from '@playdapp/ui';
import { format } from 'date-fns';

type Props = {
  noticeId: number;
  title: string;
  dateCreate: string;
};

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 63px;
  margin: 2px 0;
  border-bottom: 1px solid #efeff1;

  &:hover {
    border-radius: 8px;
    background-color: #f5f5f7;
  }
`;

const ColumnData = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0 10px 15px;

  &:first-of-type {
    width: 25%;
  }

  &:nth-of-type(2) {
  }

  &:nth-of-type(3) {
    width: 25%;
  }
`;

const Item = ({ noticeId, title, dateCreate }: Props) => {
  const date = new Date(dateCreate);

  return (
    <>
      <Link href={`/detail`}>
        <a>
          <ItemContainer>
            <ColumnData>{noticeId}</ColumnData>
            <ColumnData>{title}</ColumnData>
            <ColumnData>
              <Typography color="dgray100">
                {format(date, 'MMM-dd-yyyy h:mm:ss a')}
              </Typography>
            </ColumnData>
          </ItemContainer>
        </a>
      </Link>
    </>
  );
};

export default Item;
