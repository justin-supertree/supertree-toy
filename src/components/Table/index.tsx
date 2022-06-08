import styled from '@emotion/styled';

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
  border-bottom: 1px solid;
  width: 100%;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid;
`;

const TableTitle = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;

  /* &:first-of-type {
  }
  &:nth-of-type(2) {
  }
  &:nth-of-type(3) {
  }
  &:nth-of-type(4) {
  } */
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
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
