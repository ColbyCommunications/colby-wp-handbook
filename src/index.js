import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { Route } from 'react-router-dom';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import { categories, pages, search } from './reducers';
import StudentHandbook from './components/student-handbook';
import ConnectedBrowserRouter from './utils/ConnectedBrowserRouter';

const REST_BASE = 'http://author.colby.edu/communitylife/wp-json/wp/v2/';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { categories: null, pages: null };

    this.history = createHistory();
    this.routerHistoryMiddleware = routerMiddleware(this.history);

    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchPages = this.fetchPages.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchPages();
  }

  fetchCategories() {
    let url = `${REST_BASE}handbook-section?per_page=99`;
    url = `${url}&orderby=slug&order=asc`;

    return fetch(url)
      .then((response) => response.json())
      .then((receivedCategories) => {
        this.setState({ categories: receivedCategories });
      });
  }

  fetchPages() {
    let url = `${REST_BASE}handbook-page`;
    url = `${url}?per_page=99&orderby=slug&order=asc`;

    fetch(url).then((response) => response.json()).then((receivedPages) => {
      const categorizedPages = {};

      receivedPages.forEach((post) => {
        post['handbook-section'].forEach((section) => {
          if (!categorizedPages[section]) {
            categorizedPages[section] = [];
          }

          categorizedPages[section].push(post);
        });
      });

      this.setState({ pages: categorizedPages });
    });
  }

  render() {
    if (Object.values(this.state).includes(null)) {
      return null;
    }

    const middlewares = [thunkMiddleware, this.routerHistoryMiddleware];

    if (window.location.href.indexOf('localhost') !== -1) {
      middlewares.push(createLogger());
    }

    const store = createStore(
      combineReducers({ categories, pages, search, routerReducer }),
      {
        categories: {
          categories: this.state.categories,
          activeCategory: this.state.categories[0],
        },
        pages: {
          pages: this.state.pages,
        },
        search: {
          searching: false,
          searchTerm: '',
        },
      },
      applyMiddleware(...middlewares)
    );

    const wp = location.href.indexOf('localhost') === -1 ? '' : '/wp';

    return (
      <Provider store={store}>
        <ConnectedBrowserRouter
          history={this.history}
          basename={`${wp}/communitylife/student-handbook/`}
        >
          <Route path="/" component={StudentHandbook} />
        </ConnectedBrowserRouter>
      </Provider>
    );
  }
}

function init() {
  document.querySelectorAll('[data-student-handbook]').forEach((container) => {
    render(<App />, container);
  });
}

window.addEventListener('load', init);
