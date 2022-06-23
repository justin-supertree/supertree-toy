import React, { useEffect } from 'react';
import { NextPage } from 'next';
import styled from '@emotion/styled';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

interface IEditor {
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
}

const ContentEditorBox = styled(ToastEditor)`
  width: 100%;
  min-height: 392px;
  margin-top: 1rem;
  border: 1px solid;
`;

const TUI: NextPage<IEditor> = ({ htmlStr, setHtmlStr }) => {
  const editorRef = React.useRef<ToastEditor>(null);

  const onChangeEditor = () => {
    if (editorRef.current) {
      setHtmlStr(editorRef.current.getInstance().getHTML());
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setHTML(htmlStr);
      editorRef.current.getInstance().removeHook('addImageBlobHook');

      // 이미지 서버로 데이터를 전달하는 기능 추가
      //   editorRef.current
      //     .getInstance()
      //     .addHook('addImageBlobHook', (blob, callback) => {
      //       (async () => {
      //         const formData = new FormData();
      //         formData.append('multipartFiles', blob);

      //         const res = await axios.post(
      //           'http://localhost:8080/uploadImage',
      //           formData,
      //         );

      //         callback(res.data, 'input alt text');
      //       })();

      //       return false;
      //     });
    }
  }, [htmlStr]);

  const plugins = [colorSyntax];

  return (
    <ContentEditorBox
      initialValue=""
      previewStyle="vertical"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      ref={editorRef}
      plugins={plugins}
      onChange={onChangeEditor}
    />
  );
};

export default TUI;
