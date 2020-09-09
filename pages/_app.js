import App from "next/app";
import React from "react";
import { Provider } from "mobx-react";
import { DataStore } from "../stores/DataStore";

class MyApp extends App {
  state = {
    dataStore: new DataStore()
  };

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);

    return {
      ...appProps,
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider dataStore={this.state.dataStore}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default MyApp;