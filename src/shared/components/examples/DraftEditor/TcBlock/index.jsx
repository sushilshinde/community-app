/*
 * Test custom block. At the moment it renders two columns, each containing
 * a separate editor. If we manage to get it work smoothly, then we can expand
 * it for more layout options, and background images.
 */

import PT from 'prop-types';
import React from 'react';
import Editor from '../Editor';

import './style.scss';

export default function TcBlock({ blockProps }) {
  return (
    <div>
      <div styleName="column">
        <Editor
          parent={blockProps.parent}
          register={blockProps.register}
        />
      </div>
      <div styleName="column">
        <Editor
          parent={blockProps.parent}
          register={blockProps.register}
        />
      </div>
    </div>
  );
}

TcBlock.propTypes = {
  blockProps: PT.shape({
    parent: PT.object,
  }).isRequired,
};
