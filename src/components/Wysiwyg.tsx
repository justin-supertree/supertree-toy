import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import { NextPage } from 'next';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ContentEditorBox = styled.div`
  width: 100%;
  min-height: 392px;
  margin-top: 1rem;
  border: 1px solid;
`;

interface IEditor {
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
}

const Wysiwyg: NextPage<IEditor> = ({ htmlStr, setHtmlStr }) => {
  const [content, setContent] = useState('');
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  );

  React.useEffect(() => {
    const blocksFromHtml = htmlToDraft(htmlStr);

    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap,
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [htmlStr]);

  // editor 수정 이벤트
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setHtmlStr(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  // const uploadCallback = (file: Blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onloadend = async () => {
  //       const formData = new FormData();
  //       formData.append('multipartFiles', file);
  //       const res = await axios.post(
  //         'http://localhost:8080/uploadImage',
  //         formData,
  //       );

  //       resolve({ data: { link: res.data } });
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // };

  const toolbar = {
    options: [
      'inline',
      'blockType',
      'fontSize',
      'list',
      'textAlign',
      'history',
      'embedded',
      'emoji',
      'image',
    ],
    inline: { inDropdown: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true },
  };

  const localization = {
    locale: 'ko',
  };

  return (
    <>
      <ContentEditorBox>
        <Editor
          editorState={editorState}
          wrapperClassName="card"
          editorClassName="card-body"
          onEditorStateChange={onEditorStateChange}
          toolbar={toolbar}
          localization={localization}
        />
      </ContentEditorBox>
    </>
  );
};

export default Wysiwyg;
