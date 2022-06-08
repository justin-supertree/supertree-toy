import styled from '@emotion/styled';

type Props = {};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ColumnData = styled.div`
  display: flex;
  border-right: 1px solid;
  width: 100%;
  padding: 10px 0 10px 15px;

  /* &:first-of-type {
    width: 15%;
  }
  &:nth-of-type(2) {
    width: 15%;
  }
  &:nth-of-type(3) {
    width: 15%;
  }
  &:nth-of-type(4) {
    width: 15%;
  } */
`;

const Item = () => {
  return (
    <Container>
      <ColumnData>Here is Item Table</ColumnData>
      <ColumnData>Here is Item Table</ColumnData>
      <ColumnData>Here is Item Table</ColumnData>
      <ColumnData>Here is Item Table</ColumnData>
    </Container>
  );
};

export default Item;
