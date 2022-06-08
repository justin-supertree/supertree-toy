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

const TableTitle = styled.p`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  font-size: 25px;
  font-weight: 500;
  margin: 0;
  padding: 10px 0 10px 15px;
  text-transform: capitalize;
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
