/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { select, dispatch } from '@wordpress/data';

export const setCategories = ( categories ) => ( {
	type: 'SET_CATEGORIES',
	categories,
} );

export const setActiveCategory = ( activeCategory ) => ( {
	type: 'SET_ACTIVE_CATEGORY',
	activeCategory,
} );

export const setPosts = ( posts ) => ( {
	type: 'SET_POSTS',
	posts,
} );

export const setActivePost = ( activePost ) => ( {
	type: 'SET_ACTIVE_POST',
	activePost,
} );

export const setIsSearching = ( isSearching ) => ( {
	type: 'SET_IS_SEARCHING',
	isSearching,
} );

export const setSearchTerm = ( searchTerm ) => ( {
	type: 'SET_SEARCH_TERM',
	searchTerm,
} );

export const setSearchResults = ( searchResults ) => ( {
	type: 'SET_SEARCH_RESULTS',
	searchResults,
} );

const _search = () => {
	const searchCache = {};

	const runSearch = async () => {
		if ( select( 'colby/wp-handbook' ).isSearching() ) {
			return;
		}

		const searchTerm = select( 'colby/wp-handbook' ).getSearchTerm();

		if ( searchTerm.length < 4 ) {
			return;
		}

		dispatch( 'colby/wp-handbook' ).setIsSearching( true );

		const path = `handbook-page?search=${ searchTerm }`;

		if ( path in searchCache ) {
			dispatch( 'colby/wp-handbook' ).setSearchResults( searchCache[ path ] );
		} else {
			const posts = await apiFetch( { path } );
			const filteredPosts = posts.filter( ( post ) => post );
			searchCache[ path ] = filteredPosts;
			dispatch( 'colby/wp-handbook' ).setSearchResults( searchCache[ path ] );
		}

		dispatch( 'colby/wp-handbook' ).setIsSearching( false );
		const newSearchTerm = select( 'colby/wp-handbook' ).getSearchTerm();
		if ( newSearchTerm !== searchTerm ) {
			runSearch( newSearchTerm );
		}
	};

	return runSearch;
};
export const search = _search();
