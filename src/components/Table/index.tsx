import styled from '@emotion/styled';

import {
  breakpoints,
  spacing,
  palette,
  Button,
  Typography,
} from '@playdapp/ui';

import Item from './Item';

type Props = {
  title: string;
  headers: string[];
  isEmpty?: boolean;
  children: React.ReactNode;
};

const TableBox = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #efeff1;
  width: 100%;
  margin: auto;

  ${breakpoints.down('md')} {
    margin-top: 1rem;
  }
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efeff1;

  ${breakpoints.down('md')} {
    display: none;
  }
`;

const TableTitle = styled.div`
  display: grid;
  align-items: center;
  text-align: left;
  width: 100%;
  font-size: 12px;
  font-weight: 600;
  margin: 0;
  padding: 10px 0 10px 15px;
  color: #999ca8;
  text-transform: capitalize;

  &:first-of-type {
    width: 25%;
  }

  &:nth-of-type(2) {
  }

  &:nth-of-type(3) {
    width: 25%;
  }
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 723px;
`;

const Table = ({ children, title, headers, isEmpty }: Props) => {
  return (
    <TableBox>
      {!isEmpty && (
        <>
          <TableHeader>
            {headers.map((info) => (
              <TableTitle key={`${title}${info}`}>{info}</TableTitle>
            ))}
          </TableHeader>
          <TableBody>{children}</TableBody>
        </>
      )}
    </TableBox>
  );
};

Table.Item = Item;

export default Table;
