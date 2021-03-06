import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap'
import MainView from './components/main-view/main-view';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension'

import moviesApp from './redux/reducers/reducers';
// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container className="my-flix" fluid>
          <MainView/>
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
