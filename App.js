import React, { Component } from "react";
import LoadingScreen from "./src/component//LoadingScreen";
import { Provider } from 'react-redux';
import configureStore from './src/utils/store';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
  }

  componentWillMount() {
    console.disableYellowBox = true;
  }

  render() {
    if (this.state.isLoading) return null;
    return (
      <Provider store={this.state.store}>
        <LoadingScreen />
      </Provider>
    );
  }
}

export default App;