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

import PT from 'prop-types';
import React from 'react';
import {
  Editor as DraftEditor,
  EditorState,
} from 'draft-js';

import './style.scss';

export default class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  render() {
    return (
      <div styleName="editor">
        <DraftEditor
          editorState={this.state.editorState}
          onChange={(state) => {
            const editorState = EditorState.setInlineStyleOverride(
              state, this.state.editorState.getCurrentInlineStyle(),
            );
            this.setState({ editorState });
          }}
        />
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
