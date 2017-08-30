import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  SET_ACTIVE_CATEGORY,
  REQUEST_PAGE,
  RECEIVE_PAGE,
  CHANGE_SEARCH_TERM,
  RECEIVE_SEARCH_RESULTS,
  SET_ACTIVE_POST,
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
        savedActiveCategory:
          state.activeCategory === null
            ? state.savedActiveCategory
            : state.activeCategory,
      });

    case REQUEST_CATEGORIES:
      return Object.assign({}, state, { fetching: true, categories: [] });

    case RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        fetching: false,
        categories: action.categories,
        activeCategory: action.categories[0].id,
        activeCategoryTitle: action.categories[0].name,
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
function pages(
  state = {
    fetching: false,
    posts: [],
    loaded: false,
  },
  action
) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return Object.assign({}, state, { loaded: false });

    case REQUEST_PAGE:
      return Object.assign({}, state, { fetching: true, loaded: true });

    case RECEIVE_PAGE:
      return Object.assign({}, state, {
        fetching: false,
        posts: action.posts,
        loaded: true,
      });

    case SET_ACTIVE_POST: {
      return Object.assign({}, state, { activePost: action.post });
    }

    default:
      return state;
  }
}

/* Reducer for search-related actions. */
function search(
  state = {
    searching: false,
    posts: [],
    searchTerm: '',
  },
  action
) {
  switch (action.type) {
    case REQUEST_PAGE: {
      return Object.assign({}, state, { searchTerm: '' });
    }

    case CHANGE_SEARCH_TERM: {
      return Object.assign({}, state, {
        searchTerm: action.searchTerm,
        searching: !!action.searchTerm.length,
      });
    }

    case SET_ACTIVE_POST: {
      return Object.assign({}, state, { searchTerm: '' });
    }

    case RECEIVE_SEARCH_RESULTS: {
      return Object.assign({}, state, {
        posts: action.posts,
        searching: false,
      });
    }

    default: {
      return state;
    }
  }
}

export { categories, pages, search };
