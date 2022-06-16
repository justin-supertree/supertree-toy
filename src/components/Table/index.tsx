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
  border-bottom: 1px solid #efeff1;
  width: 100%;
  margin: auto;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efeff1;
`;

const TableTitle = styled.div`
  display: grid;
  align-items: center;
  text-align: left;
  width: 100%;
  font-size: 12px;
  font-weight: 500;
  margin: 0;
  padding: 10px 0 10px 15px;
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
