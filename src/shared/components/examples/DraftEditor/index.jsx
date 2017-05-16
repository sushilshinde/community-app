/**
 * POC page editor, assembled directly from DraftJS.
 */

// import draftToHtml from 'draftjs-to-html';
import React from 'react';
import Editor from './Editor';
import Toolbar from './Toolbar';

// import { convertToRaw, Editor, EditorState, RichUtils } from 'draft-js';
import './style.scss';

export default function DraftEditor() {
  return (
    <div>
      <Toolbar />
      <Editor />
    </div>
  );
}
