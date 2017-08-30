/* eslint no-new: 0 */
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { Route } from 'react-router-dom';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import { categories, pages, search } from './reducers';
import { setActivePost, setActiveCategory } from './actions';
import StudentHandbook from './components/student-handbook';
import ConnectedBrowserRouter from './utils/ConnectedBrowserRouter';

class App {
  constructor(props) {
    this.props = props;

    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchPages = this.fetchPages.bind(this);
    this.setUpStore = this.setUpStore.bind(this);
    this.render = this.render.bind(this);

    this.fetchCategories();
  }

  setUpStore() {
    this.history = createHistory();
    const routerHistoryMiddleware = routerMiddleware(history);
    const middlewares = [thunkMiddleware, routerHistoryMiddleware];

    if (window.location.href.indexOf('localhost') !== -1) {
      middlewares.push(createLogger());
    }

    this.store = createStore(
      combineReducers({ categories, pages, search, routerReducer }),
      {
        categories: {
          categories: this.categories,
          activeCategory: this.categories[0].id,
        },
        pages: {
          pages: this.pages,
          activePost: this.pages[this.categories[0].id][0],
        },
        search: {
          searching: false,
          searchTerm: '',
        },
      },
      applyMiddleware(...middlewares)
    );

    this.render();
  }

  fetchCategories() {
    let url = `${window.COLBY_HANDBOOK_REST_URL}handbook-section?per_page=99`;
    url = `${url}&orderby=slug&order=asc`;

    return fetch(url)
      .then((response) => response.json())
      .then((receivedCategories) => {
        this.categories = receivedCategories;
        this.fetchPages();
      });
  }

  fetchPages() {
    let url = `${window.COLBY_HANDBOOK_REST_URL}handbook-page`;
    url = `${url}?per_page=99&orderby=slug&order=asc`;

    fetch(url).then((response) => response.json()).then((receivedPages) => {
      const categorizedPages = {};

      const filteredReceivedPages = receivedPages.filter((page) => page);
      filteredReceivedPages.forEach((post) => {
        post['handbook-section'].forEach((section) => {
          if (!categorizedPages[section]) {
            categorizedPages[section] = [];
          }

          categorizedPages[section].push(post);
        });
      });

      this.pages = categorizedPages;
      this.setUpStore();
    });
  }

  render() {
    const wp = location.href.indexOf('localhost') === -1 ? '' : '/wp';
    const siteName =
      location.href.indexOf('localhost') === -1
        ? 'studentlife'
        : 'communitylife';

    ReactDOM.render(
      <Provider store={this.store}>
        <ConnectedBrowserRouter
          history={this.history}
          basename={`${wp}/${siteName}`}
        >
          <div className="container">
            <Route exact path="/handbook" component={StudentHandbook} />
            <Route
              path="/handbook-section/:slug"
              render={(props) => {
                const activeCategory = Object.values(
                  this.store.getState().categories.categories
                ).filter(
                  (category) => category.slug === props.match.params.slug
                )[0];

                this.store.dispatch(
                  setActivePost(
                    this.store.getState().pages.pages[activeCategory.id][0]
                  )
                );
                this.store.dispatch(setActiveCategory(activeCategory.id));
                return <StudentHandbook />;
              }}
            />
            <Route
              path="/handbook/:slug"
              render={(props) => {
                let pagesArray = [];
                Object.values(
                  this.state.store.getState().pages.pages
                ).forEach((array) => {
                  pagesArray = pagesArray.concat(array);
                });

                const activePosts = pagesArray.filter(
                  (post) => post.slug && post.slug === props.match.params.slug
                );

                if (activePosts.length) {
                  this.state.store.dispatch(setActivePost(activePosts[0]));
                }

                return <StudentHandbook />;
              }}
            />
          </div>
        </ConnectedBrowserRouter>
      </Provider>,
      this.props.container
    );
  }
}

function init() {
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-student-handbook]'),
    (container) => new App({ container })
  );
}

window.addEventListener('load', init);
