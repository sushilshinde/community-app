import FaBold from 'react-icons/fa/bold';
import FaCode from 'react-icons/fa/code';
import FaItalic from 'react-icons/fa/italic';
import FaStrikethrough from 'react-icons/fa/strikethrough';
import FaSubscript from 'react-icons/fa/subscript';
import FaSuperscript from 'react-icons/fa/superscript';
import FaUnderline from 'react-icons/fa/underline';
import React from 'react';

import { RichUtils } from 'draft-js';

import './style.scss';

export default function Standard({ editorState, setEditorState }) {

  function toggleInlineStyle(style) {
    const newState = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(newState);
  }

  return (
    <div>
      <button onClick={() => toggleInlineStyle('BOLD')}><FaBold /></button>
      <button><FaItalic /></button>
      <button><FaUnderline /></button>
      <button><FaStrikethrough /></button>
      <div styleName="separator" />
      <button><FaCode /></button>
      <button><FaSubscript /></button>
      <button><FaSuperscript /></button>
    </div>
  );
}
