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
import { setActivePost } from './actions';
import StudentHandbook from './components/student-handbook';
import ConnectedBrowserRouter from './utils/ConnectedBrowserRouter';

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
    let url = `${window.COLBY_HANDBOOK_REST_URL}handbook-section?per_page=99`;
    url = `${url}&orderby=slug&order=asc`;

    return fetch(url)
      .then((response) => response.json())
      .then((receivedCategories) => {
        this.setState({ categories: receivedCategories });
      });
  }

  fetchPages() {
    let url = `${window.COLBY_HANDBOOK_REST_URL}handbook-page`;
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
          activeCategory: this.state.categories[0].id,
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
          basename={`${wp}/communitylife/handbook/`}
        >
          <div className="container">
            <Route exact path="/" component={StudentHandbook} />
            <Route
              path="/:slug"
              render={(props) => {
                let pagesArray = [];
                Object.values(store.getState().pages.pages).forEach((array) => {
                  pagesArray = pagesArray.concat(array);
                });

                const activePosts = pagesArray.filter(
                  (post) => post.slug && post.slug === props.match.params.slug
                );

                if (activePosts.length) {
                  store.dispatch(setActivePost(activePosts[0]));
                }

                return <StudentHandbook />;
              }}
            />
          </div>
        </ConnectedBrowserRouter>
      </Provider>
    );
  }
}

function init() {
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-student-handbook]'),
    (container) => {
      render(<App />, container);
    }
  );
}

window.addEventListener('load', init);
