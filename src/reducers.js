import { combineReducers } from 'redux';

import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  SET_ACTIVE_CATEGORY,
  REQUEST_PAGE,
  RECEIVE_PAGE,
  CHANGE_SEARCH_TERM,
  RECEIVE_SEARCH_RESULTS,
} from './actions';

/* Reducer for requesting, receiving, and setting acive categories. */
function categories(
  state = {
    fetching: false,
    categories: [],
    activeCategory: null,
    savedActiveCategory: null,
  },
  action
) {
  switch (action.type) {
    case CHANGE_SEARCH_TERM:
      return Object.assign({}, state, {
        activeCategory: action.searchTerm === ''
          ? state.savedActiveCategory
          : null,
        savedActiveCategory: state.activeCategory === null
          ? state.savedActiveCategory
          : state.activeCategory,
      });
    case REQUEST_CATEGORIES:
      return Object.assign({}, state, { fetching: true, categories: [] });
    case RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        fetching: false,
        categories: action.categories,
      });
    case SET_ACTIVE_CATEGORY:
      return Object.assign({}, state, {
        activeCategory: action.id,
      });
    default:
      return state;
  }
}

/* Reducer for requesting and receiving pages in a category. */
function page(
  state = {
    fetching: false,
    posts: [],
  },
  action
) {
  switch (action.type) {
    case REQUEST_PAGE:
      return Object.assign({}, state, { fetching: true });
    case RECEIVE_PAGE:
      return Object.assign({}, state, {
        fetching: false,
        posts: action.posts,
      });
    default:
      return state;
  }
}

/* Reducer for search-related actions. */
function search(
  state = {
    fetching: false,
    posts: [],
    searchTerm: '',
  },
  action
) {
  switch (action.type) {
    case REQUEST_PAGE:
      return Object.assign({}, state, { searchTerm: '' });
    case CHANGE_SEARCH_TERM:
      return Object.assign({}, state, {
        searchTerm: action.searchTerm,
        fetching: true,
      });
    case RECEIVE_SEARCH_RESULTS:
      return Object.assign({}, state, { posts: action.posts, fetching: false });
    default:
      return state;
  }
}

export default combineReducers({ categories, page, search });
