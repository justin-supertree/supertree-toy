import { useMedia } from 'react-use';
import Link from 'next/link';
import styled from '@emotion/styled';
import { breakpoints, Typography } from '@playdapp/ui';
import { format } from 'date-fns';

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
  padding: 8px 0;
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
    width: 30%;
    text-align: left;
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
  }
`;

const Item = ({ noticeId, title, dateCreate, type, tab }: Props) => {
  const date = new Date(dateCreate);
  const isTablet = useMedia('(max-width: 1023px)', true);

  return (
    <>
      {type !== '' && (
        <Link href={`/detail/${noticeId}?${type}`} passHref>
          <a>
            <ItemContainer>
              <ColumnData>
                <Typography type={isTablet ? 'p4' : 'p3'} color="black">
                  {noticeId}
                </Typography>
              </ColumnData>
              <ColumnData>
                <OverflowColumn>
                  <Typography type={isTablet ? 'p4' : 'p3'} color="black">
                    {title ? title : 'Empty Title'}
                  </Typography>
                </OverflowColumn>
              </ColumnData>
              <ColumnData>
                <Typography type="p4" color="dgray100">
                  {format(date, 'MMM-dd-yyyy h:mm:ss a')}
                </Typography>
              </ColumnData>
            </ItemContainer>
          </a>
        </Link>
      )}
    </>
  );
};

export default Item;
