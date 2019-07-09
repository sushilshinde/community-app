/**
 * New Banner component.
 */

import ContentfulLoader from 'containers/ContentfulLoader';
import LoadingIndicator from 'components/LoadingIndicator';
import PT from 'prop-types';
import React from 'react';

import Banner from './Banner';

/* eslint-disable global-require */
const THEMES = {
  TopGear: require('./themes/top_gear.scss'),
  'Default Sub-Community': require('./themes/default_sub-community.scss'),
  'Simple Title above Background':
    require('./themes/simple_title_above_background.scss'),
  TCO19: require('./themes/tco19.scss'),
  'TCO19-left': require('./themes/tco19-left.scss'),
  'TCO19-right': require('./themes/tco19-right.scss'),
  Veterans: require('./themes/veterans.scss'),
  Zurich: require('./themes/zurich.scss'),
  General: require('./themes/general.scss'),
};
/* eslint-enable global-require */

/* Loads banner background asset. */
function BackgroundLoader(props) {
  const {
    banner, preview, spaceName, environment,
  } = props;
  const assetId = banner.backgroundImage.sys.id;
  return (
    <ContentfulLoader
      assetIds={assetId}
      preview={preview}
      spaceName={spaceName}
      environment={environment}
      render={data => (
        <Banner
          {...props}
          background={data.assets.items[assetId].fields}
          theme={THEMES[banner.baseTheme]}
        />
      )}
      renderPlaceholder={LoadingIndicator}
    />
  );
}


BackgroundLoader.defaultProps = {
  spaceName: null,
  environment: null,
};

BackgroundLoader.propTypes = {
  banner: PT.shape().isRequired,
  id: PT.string.isRequired,
  preview: PT.bool.isRequired,
  spaceName: PT.string,
  environment: PT.string,
};

/* Loads the main banner entry. */
export default function BannerLoader(props) {
  const {
    id, preview, spaceName, environment,
  } = props;
  return (
    <ContentfulLoader
      entryIds={id}
      preview={preview}
      spaceName={spaceName}
      environment={environment}
      render={data => (
        <BackgroundLoader
          {...props}
          banner={data.entries.items[id].fields}
        />
      )}
      renderPlaceholder={LoadingIndicator}
    />
  );
}

BannerLoader.defaultProps = {
  preview: false,
  spaceName: null,
  environment: null,
};

BannerLoader.propTypes = {
  id: PT.string.isRequired,
  preview: PT.bool,
  spaceName: PT.string,
  environment: PT.string,
};
