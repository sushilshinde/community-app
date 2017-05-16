import FaBold from 'react-icons/fa/bold';
import FaCode from 'react-icons/fa/code';
import FaItalic from 'react-icons/fa/italic';
import FaStrikethrough from 'react-icons/fa/strikethrough';
import FaSubscript from 'react-icons/fa/subscript';
import FaSuperscript from 'react-icons/fa/superscript';
import FaUnderline from 'react-icons/fa/underline';
import React from 'react';

import { EditorState, Modifier, RichUtils } from 'draft-js';

import './style.scss';

export default function Standard({ editorState, setEditorState }) {

  function toggleInlineStyle(style) {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  }

  return (
    <div>
      <button
        className="active"
        onClick={() => toggleInlineStyle('BOLD')}
      >
        <FaBold />
      </button>
      <button onClick={() => toggleInlineStyle('ITALIC')}>
        <FaItalic />
      </button>
      <button onClick={() => toggleInlineStyle('UNDERLINE')}>
        <FaUnderline />
      </button>
      <button onClick={() => toggleInlineStyle('STRIKETHROUGH')}>
        <FaStrikethrough />
      </button>
      <div styleName="separator" />
      <button onClick={() => toggleInlineStyle('CODE')}>
        <FaCode />
      </button>
      <button onClick={() => toggleInlineStyle('SUBSCRIPT')}>
        <FaSubscript />
      </button>
      <button onClick={() => toggleInlineStyle('SUPERSCRIPT')}>
        <FaSuperscript />
      </button>
    </div>
  );
}
