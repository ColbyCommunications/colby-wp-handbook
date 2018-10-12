/* Reducer for requesting, receiving, and setting acive categories. */
export function categories(
	state = {
		categories: [],
		activeCategory: null,
	},
	action
) {
	switch ( action.type ) {
		case 'SET_CATEGORIES': {
			return {
				...state,
				categories: action.categories,
			};
		}

		case 'SET_ACTIVE_CATEGORY': {
			return {
				...state,
				activeCategory: action.activeCategory,
			};
		}
	}

	return { ...state };
}

/* Reducer for requesting and receiving posts in a category. */
export function posts(
	state = {
		posts: [],
		activePost: null,
	},
	action
) {
	switch ( action.type ) {
		case 'SET_ACTIVE_POST': {
			return {
				...state,
				activePost: action.activePost,
			};
		}

		case 'SET_POSTS': {
			return {
				...state,
				posts: action.posts,
			};
		}
	}

	return { ...state };
}

/* Reducer for search-related actions. */
export function search(
	state = {
		searching: false,
		searchResults: [],
		searchTerm: '',
	},
	action
) {
	switch ( action.type ) {
		case 'SET_IS_SEARCHING': {
			return {
				...state,
				isSearching: action.isSearching,
			};
		}

		case 'SET_SEARCH_TERM': {
			return {
				...state,
				searchTerm: action.searchTerm,
			};
		}

		case 'SET_SEARCH_RESULTS': {
			return {
				...state,
				searchResults: action.searchResults,
			};
		}
	}

	return { ...state };
}
