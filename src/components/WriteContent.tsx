import React from 'react';
import styled from '@emotion/styled';
import { breakpoints, palette, Button } from '@playdapp/ui';
import { Input, Select, Textarea } from '@chakra-ui/react';

const FlexMixin = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const InsertArea = styled.div`
  max-width: 50rem;
  width: 100%;
  padding: 5rem 2rem 3rem 2rem;
  margin: auto;
  margin-bottom: 5rem;
  border-radius: 24px;
  border: 1px solid ${palette.gray900};

  /* ${breakpoints.down('md')} {
  } */
`;

const InsertItem = styled(FlexMixin)`
  margin-bottom: 15px;
  text-align: left;
  white-space: nowrap;
`;

const OptionTitle = styled.span`
  font-size: 25px;
  font-weight: 700;
  margin-right: 15px;
`;

const ContentTitleInput = styled(Input)`
  width: 100%;
  min-height: 3rem;
  margin: 0;
`;

const ContentTypeSelect = styled(Select)`
  width: 100%;
  min-height: 3rem;
  margin: 0;
`;

const ContentInputBox = styled(Textarea)`
  width: 100%;
  min-height: 20rem;
  margin-top: 1rem;
`;

const UpdateButton = styled(Button)`
  width: 100%;
  margin-top: 2rem;
  color: #ffff;
`;

const WriteContent = () => {
  return (
    <>
      <InsertArea>
        <InsertItem>
          <OptionTitle>Title :</OptionTitle>
          <ContentTitleInput value={title} onChange={handleTitle} />
        </InsertItem>

        <InsertItem>
          <OptionTitle>Type :</OptionTitle>
          <ContentTypeSelect placeholder="Select option">
            <option value="Service">Option 1</option>
            <option value="Tip">Option 2</option>
            <option value="Event">Option 3</option>
          </ContentTypeSelect>
        </InsertItem>

        <div>
          <OptionTitle>Content :</OptionTitle>
          <br />
          <ContentInputBox
            type="text"
            value={content}
            onChange={handleContent}
            placeholder="Please Write your contents in here"
          />
        </div>

        <UpdateButton color="marketplace" onClick={uploadNewData}>
          Button
        </UpdateButton>
      </InsertArea>
    </>
  );
};

export default WriteContent;
