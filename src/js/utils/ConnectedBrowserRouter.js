import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter } from 'react-router-dom';

class ConnectedBrowserRouter extends ConnectedRouter {
  render() {
    return <BrowserRouter {...this.props} />;
  }
}

export default ConnectedBrowserRouter;
