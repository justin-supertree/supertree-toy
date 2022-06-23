import Link from 'next/link';
import { breakpoints, Typography } from '@playdapp/ui';
import { format } from 'date-fns';
import styled from '@emotion/styled';
import { useMedia } from 'react-use';

type Props = {
  noticeId: number;
  title: string;
  dateCreate: string;
  type: string;
  tab: string;
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

  ${breakpoints.down('md')} {
    display: block;
    height: auto;
    background-color: #f5f5f7;
    border-radius: 8px;
    margin-bottom: 8px;
    padding: 1rem;

    &:hover {
      border-radius: 8px;
      background-color: #efeff1;
    }
  }
`;

const ColumnData = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0 10px 15px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;

  &:first-of-type {
    width: 25%;
  }

  &:first-of-type(2) {
  }

  &:nth-of-type(3) {
    width: 25%;
  }

  ${breakpoints.down('md')} {
    padding: 0;
    text-align: left;

    &:first-of-type {
      display: none;
    }

    &:first-of-type(2) {
    }

    &:nth-of-type(3) {
      width: 100%;
      grid-column: 3;
      margin-top: 12px;
    }
  }
`;

const OverflowColumn = styled.div`
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${breakpoints.down('md')} {
    white-space: unset;
    font-size: 14px;
    font-weight: 400;
  }
`;

const Item = ({ noticeId, title, dateCreate, type, tab }: Props) => {
  const date = new Date(dateCreate);

  const isMobile = useMedia('(max-width: 752px)', true);

  return (
    <>
      {type !== '' && (
        <Link href={`/detail/${noticeId}`} passHref>
          <a>
            <ItemContainer>
              <ColumnData>{noticeId}</ColumnData>
              <ColumnData>
                <OverflowColumn>{title ? title : 'Empty Title'}</OverflowColumn>
              </ColumnData>
              <ColumnData>
                <OverflowColumn>
                  <Typography type={!isMobile ? 'b3' : 'b5'} color="dgray100">
                    {format(date, 'MMM-dd-yyyy h:mm:ss a')}
                  </Typography>
                </OverflowColumn>
              </ColumnData>
            </ItemContainer>
          </a>
        </Link>
      )}
    </>
  );
};

export default Item;
