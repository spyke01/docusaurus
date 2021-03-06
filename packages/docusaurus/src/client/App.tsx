/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useEffect, useState} from 'react';

import routes from '@generated/routes';
import siteConfig from '@generated/docusaurus.config';
import globalData from '@generated/globalData';
import siteMetadata from '@generated/site-metadata';
import renderRoutes from './exports/renderRoutes';
import DocusaurusContext from './exports/context';
import ErrorBoundary from './ErrorBoundary';
import PendingNavigation from './PendingNavigation';

import './client-lifecycles-dispatcher';

function App(): JSX.Element {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const logError = process.env.NODE_ENV !== 'production';
  const showError = process.env.NODE_ENV !== 'production';

  return (
    <ErrorBoundary logError={logError} showError={showError}>
      <DocusaurusContext.Provider
        value={{siteConfig, siteMetadata, globalData, isClient}}>
        <PendingNavigation routes={routes}>
          {renderRoutes(routes)}
        </PendingNavigation>
      </DocusaurusContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
