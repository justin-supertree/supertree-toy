import type { NextPage } from 'next';

import styled from '@emotion/styled';

const Container = styled.div`
  border: 1px solid;
  width: auto;
  text-align: center;
`;

const IndexPage: NextPage = () => {
  return (
    <>
      <Container>
        <div>
          <h1>Welcome to Justin Toy projecasdadsadt</h1>
          <div>Here is Main body</div>
        </div>

        <div>
          <h1>Here is footer Area</h1>
        </div>
      </Container>
    </>
  );
};

export default IndexPage;
