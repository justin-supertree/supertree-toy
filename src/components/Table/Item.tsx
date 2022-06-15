import Link from 'next/link';
import styled from '@emotion/styled';

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

  &:hover {
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
  return (
    <>
      <Link href={`/detail`}>
        <a>
          <ItemContainer>
            <ColumnData>{noticeId}</ColumnData>
            <ColumnData>{title}</ColumnData>
            <ColumnData>{dateCreate}</ColumnData>.
          </ItemContainer>
        </a>
      </Link>
    </>
  );
};

export default Item;
