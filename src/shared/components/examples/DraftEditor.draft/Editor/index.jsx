/**
 * Main editor component.
 * It is largerly inspired by the example
 * https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/tex
 */

/* NOTE: According to docs https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
  this error should not be triggered when element has proper value of the
  role attribute. However, AirBnB ESLint config uses legacy version of
  eslint-plugin-jsx-a11y, and it does not follow the docs. */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import _ from 'lodash';
import FaBeer from 'react-icons/fa/beer';
import StandardToolbar from '../toolbars/Standard';
import { Map } from 'immutable';
import PT from 'prop-types';
import React from 'react';
import {
  AtomicBlockUtils,
  Editor as DraftEditor,
  EditorState,
} from 'draft-js';

import TcBlock from '../TcBlock';

import './style.scss';

let blockCount = 0;

export default class Editor extends React.Component {

  constructor(props) {
    console.log('!EDITOR INITIALIZATION!');
    super(props);
    this.state = {
      children: [],
      editorState: EditorState.createEmpty(),
      readOnly: false,
    };
    this.blockId = blockCount;
    blockCount += 1;
    if (props.register) props.register(this);
  }

  setEditable() {
    this.setState({
      readOnly: false,
    });
    this.state.children.forEach(child => child.setEditable());
  }

  setReadOnly() {
    this.setState({
      readOnly: true,
    });
    if (this.props.parent) this.props.parent.setReadOnly();
  }

  insertTcBlock() {
    let editorState = this.state.editorState;
    let content = editorState.getCurrentContent();
    content = content.createEntity(
      'TOKEN',
      'IMMUTABLE',
      { content: 'TEST' },
    );
    const key = content.getLastCreatedEntityKey();
    editorState = EditorState.set(
      editorState,
      { currentContent: content },
    );
    editorState = AtomicBlockUtils.insertAtomicBlock(editorState, key, ' ');
    this.setState({ editorState });
  }

  renderBlock(block) {
    if (block.getType() === 'atomic') {
      return {
        component: TcBlock,
        editable: false,
        props: {
          parent: this,
          register: (child) => {
            const children = this.state.children.slice();
            children.push(child);
            this.setState({
              children,
            });
          },
        },
      };
    }
    return null;
  }

  render() {
    const { parent } = this.props;
    const { editorState } = this.state;
    const focus = editorState.getSelection().getHasFocus();
    console.log('RENDER', this.blockId, ...editorState.getCurrentInlineStyle().values());
    return (
      <div
        onClick={(e) => {
          console.log('CLICK', this.blockId);
          if (!focus && parent) parent.setReadOnly();
          this.setState({
            readOnly: false,
          }, () => this.editor.focus());
          this.state.children.forEach(child => child.setEditable());
          e.stopPropagation();
        }}
        role="button"
        styleName="editor"
      >
        <div styleName="toolbar">
          <StandardToolbar
            editorState={editorState}
            setEditorState={state => this.setState({ editorState: state })}
          />
          {/*
          <FaBeer />
          <button
            onClick={(e) => {
              this.insertTcBlock();
              e.stopPropagation();
            }}
          >test</button>
          */}
        </div>
        <div styleName="content">
          <DraftEditor
            blockRendererFn={block => this.renderBlock(block)}
            editorState={editorState}
            onChange={(newEditorState) => {
              const newFocus = newEditorState.getSelection().getHasFocus();
              const state = EditorState.setInlineStyleOverride(
                newEditorState, editorState.getCurrentInlineStyle(),
              );
              this.setState({
                editorState: state,
                readOnly: !newFocus,
              });
            }}
            readOnly={this.state.readOnly}
            ref={(node) => { this.editor = node; }}
          />
        </div>
      </div>
    );
  }
}

Editor.defaultProps = {
  parent: null,
};

Editor.propTypes = {
  parent: PT.shape({
    setReadOnly: PT.func.isRequired,
  }),
};
