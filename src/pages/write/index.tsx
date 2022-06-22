import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { breakpoints, Button, Typography } from '@playdapp/ui';
import { Input, Select, Textarea } from '@chakra-ui/react';

import { baseURL } from 'api/notice';

import WriteLayout from '@/components/Layout/WriteLayout';
import Wysiwyg from '@/components/Wysiwyg';

type Props = {
  noticeId?: number;
  title?: string;
  type?: string;
  content?: string;
  dateCreate?: string;
};

const FlexMixin = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const WriteTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
`;

const InsertArea = styled.div`
  width: 100%;
  text-align: left;
`;

const InsertItem = styled(FlexMixin)<{ type: string }>`
  padding-bottom: 15px;
  text-align: left;
  white-space: nowrap;
  border-bottom: ${({ type }) => type === 'type' && '1px solid #E3E4E7'};
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
  min-height: 392px;
  margin-top: 1rem;
`;

const EditorBox = styled.div`
  margin-top: 16px;
`;

const Editors = styled(Button)`
  margin-right: 8px;
`;

const ButtonArea = styled(FlexMixin)`
  justify-content: center;
  margin-top: 40px;
  text-align: center;

  ${breakpoints.down('md')} {
    display: block;
  }
`;

const ClickButton = styled(Button)`
  width: 100%;
  max-width: 240px;
  margin: 0 4px;
  color: #ffff;

  ${breakpoints.down('md')} {
    max-width: 100%;
    margin: 4px 0;

    &.cancel {
      order: 0;
    }
    &.write {
      order: 1;
    }
  }
`;

const WriteContent = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selected, setSelected] = useState('');

  const selectList = ['service', 'tip', 'event'];

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const cancelWrite = () => {
    router.push('/');
  };

  const uploadNewData = () => {
    if (selected === '') {
      return;
    }
    axios
      .post(`${baseURL}/notice`, {
        title: title,
        content: content,
        type: selected,
        expireTime: '2050-10-04 23:50:11',
      })
      .then((res) => {
        if (res && res.status === 200 && res.data.message === 'Success') {
          setTitle('');
          setContent('');
          router.push('/');
        }
      });
  };
  const editorList = ['base', 'quill', 'wysiwyg', 'tui'];
  const [editorName, setEditorName] = useState('base');

  const handleEditor = (edit: string) => () => {
    editorList.map((info) => {
      if (edit === info) {
        return setEditorName(edit);
      }
    });
  };

  return (
    <WriteLayout>
      <WriteTitle>
        <Typography type="h5" color="black">
          Write Notice / Edit Notice
        </Typography>
      </WriteTitle>

      <InsertArea>
        <Typography type="b4" color="gray900">
          Title :
        </Typography>
        <InsertItem type="title">
          <ContentTitleInput
            value={title}
            onChange={handleTitle}
            placeholder="Notice Title"
          />
        </InsertItem>
        <Typography type="b4" color="gray900">
          Type :
        </Typography>
        <InsertItem type="type">
          <ContentTypeSelect
            placeholder="타입을 선택해주세요."
            onChange={handleSelectOption}
            value={selected}
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </ContentTypeSelect>
        </InsertItem>

        <EditorBox>
          <Editors
            color={editorName === 'base' ? 'primary' : 'secondary'}
            onClick={handleEditor('base')}
          >
            base
          </Editors>
          <Editors
            color={editorName === 'quill' ? 'primary' : 'secondary'}
            onClick={handleEditor('quill')}
          >
            Q
          </Editors>
          <Editors
            color={editorName === 'wysiwyg' ? 'primary' : 'secondary'}
            onClick={handleEditor('wysiwyg')}
          >
            W
          </Editors>
          <Editors
            color={editorName === 'tui' ? 'primary' : 'secondary'}
            onClick={handleEditor('tui')}
          >
            TUI
          </Editors>
        </EditorBox>

        {editorName === 'base' && (
          <ContentInputBox
            type="text"
            value={content}
            onChange={handleContent}
            placeholder="Please Write your contents in here"
          />
        )}
        {editorName === 'quill' && <div>quill</div>}
        {/* {editorName === 'wysiwyg' && <Wysiwyg>wysiwyg</Wysiwyg>} */}
        {editorName === 'tui' && <div>tui</div>}

        <ButtonArea>
          <ClickButton
            className="cancel"
            size="md"
            color="primary"
            variant="outline"
            onClick={cancelWrite}
          >
            <Typography type="b3" color="primary700">
              Cancel
            </Typography>
          </ClickButton>

          <ClickButton
            className="write"
            size="md"
            color="primary"
            variant="solid"
            disabled={
              selected === '' || title === '' || content === '' ? true : false
            }
            onClick={uploadNewData}
          >
            <Typography type="b3" color="atlantic">
              Write
            </Typography>
          </ClickButton>
        </ButtonArea>
      </InsertArea>
    </WriteLayout>
  );
};

export default WriteContent;
