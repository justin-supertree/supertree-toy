import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import styled from '@emotion/styled';
import { breakpoints, Button, Typography } from '@playdapp/ui';
import { Input, Select, Textarea } from '@chakra-ui/react';

import { baseURL } from 'api/notice';

import WriteLayout from '@/components/Layout/WriteLayout';
import MetaTag from '@/components/MetaTag';

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
  margin: 16px 0;
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
  const [htmlStr, setHtmlStr] = useState('');
  const [selected, setSelected] = useState('');
  const [editorName, setEditorName] = useState('base');

  const selectList = ['service', 'tip', 'event'];
  const editorList = ['base', 'quill', 'wysiwyg', 'tui'];

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
        content: htmlStr || content,
        type: selected,
        expireTime: '2050-10-04 23:50:11',
      })
      .then((res) => {
        if (res && res.status === 200 && res.data.message === 'Success') {
          setTitle('');
          setHtmlStr('');
          router.push('/');
        }
      });
  };

  const handleEditor = (edit: string) => () => {
    editorList.map((info) => {
      if (edit === info) {
        return setEditorName(edit);
      }
    });
  };

  return (
    <>
      <MetaTag title="Notice | Write Page" />

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

            {/* <Editors
            color={editorName === 'quill' ? 'primary' : 'secondary'}
            onClick={handleEditor('quill')}
          >
            Q
          </Editors> */}

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

          {/* {editorName === 'quill' && <div>quill</div>} */}

          {editorName === 'wysiwyg' && (
            <Wysiwyg htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
          )}

          {editorName === 'tui' && (
            <TUI htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
          )}

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
                selected === '' ||
                title === '' ||
                (htmlStr === '' && content === '')
                  ? true
                  : false
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
    </>
  );
};

const Wysiwyg = dynamic(() => import('../../components/Wysiwyg'), {
  ssr: false,
});

const TUI = dynamic(() => import('../../components/TUI'), {
  ssr: false,
});

export default WriteContent;
