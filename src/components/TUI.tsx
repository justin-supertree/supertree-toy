import React, { useEffect } from 'react';
import { NextPage } from 'next';
import styled from '@emotion/styled';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

interface IEditor {
  autofocus: boolean;
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
}

const ContentEditorBox = styled(ToastEditor)`
  width: 100%;
  min-height: 392px;
  margin-top: 1rem;
  border: 1px solid;
`;

const TUI: NextPage<IEditor> = ({ htmlStr, setHtmlStr, autofocus }) => {
  const editorRef = React.useRef<ToastEditor>(null);

  const plugins = [colorSyntax];

  const onChangeEditor = () => {
    const refstatus = editorRef.current;

    if (refstatus && refstatus !== undefined && !htmlStr) {
      setHtmlStr(refstatus.getInstance().getHTML());
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current?.getInstance().setHTML(htmlStr);
    }
  }, [htmlStr]);

  return (
    <ContentEditorBox
      initialValue=""
      previewStyle="vertical"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      ref={editorRef}
      plugins={plugins}
      onChange={onChangeEditor}
      autofocus={autofocus}
    />
  );
};

export default TUI;
