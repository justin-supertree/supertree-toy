import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Editor } from 'react-draft-wysiwyg';
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

const Wysiwyg = ({ children }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Editor library
  const [picture, setPicture] = useState<string>('');
  const [headline, setHeadline] = useState<string>('');
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  );
  console.log('content', content);

  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  return (
    <div>
      <ContentEditorBox>
        <Editor
          editorState={editorState}
          wrapperClassName="card"
          editorClassName="card-body"
          onEditorStateChange={(newState) => {
            setEditorState(newState);
            setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
          }}
          toolbar={{
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
          }}
        />
      </ContentEditorBox>
    </div>
  );
};

export default Wysiwyg;
