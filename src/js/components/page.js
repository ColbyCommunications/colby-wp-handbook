/**
 * External dependencies
 */
import { Link } from 'react-router-dom';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';

import Post from './post';

const getTitle = ( searchTerm, name ) => {
	return searchTerm !== '' ? (
		<h2>
			Results for <i>{ searchTerm }</i>
		</h2>
	) : (
		<h2>{ name }</h2>
	);
};

const SearchResults = ( { searchResults, setActivePost, searching } ) => (
	<Fragment>
		{ searchResults.length === 0 && ! searching && <div>No results</div> }
		{ searchResults.map( ( post ) => (
			<div key={ post.id }>
				<Link
					key={ post.id }
					onClick={ () => setActivePost( post ) }
					to={ `/handbook-section/${ post.categorySlug }` }
					dangerouslySetInnerHTML={ { __html: post.title.rendered } }
				/>
			</div>
		) ) }
	</Fragment>
);

const Posts = ( { activeCategory, activePost, posts, categories } ) => (
	<Fragment>
		{ posts.map( ( post, i ) => (
			<Post
				activeCategory={ activeCategory }
				active={ post.id === activePost.id }
				postsLength={ posts.length }
				key={ post.id }
				categories={ categories }
				index={ i }
				{ ...post }
			/>
		) ) }
	</Fragment>
);

const Page = ( { searchTerm, name, ...props } ) => (
	<div className="page">
		{ getTitle( searchTerm, name ) }
		{ searchTerm !== '' ? <SearchResults { ...props } /> : <Posts { ...props } /> }
	</div>
);

export default compose( [
	withSelect( ( select ) => {
		const categories = select( 'colby/wp-handbook' ).getCategories();
		const posts = select( 'colby/wp-handbook' ).getPosts();
		const activeCategory = select( 'colby/wp-handbook' ).getActiveCategory();
		const isSearching = select( 'colby/wp-handbook' ).isSearching();
		const searchTerm = select( 'colby/wp-handbook' ).getSearchTerm();

		let name = '';
		if ( isSearching === true ) {
			name = 'Search Results';
		} else if ( categories.length ) {
			try {
				name = categories.filter(
					( category ) => category.id === activeCategory
				)[ 0 ].name;
			} catch ( e ) {
				name = '';
			}
		}

		return {
			activePost: select( 'colby/wp-handbook' ).getActivePost(),
			categories,
			posts: posts[ activeCategory ] || [],
			searching: isSearching,
			searchTerm,
			name,
			activeCategory,
			searchResults: select( 'colby/wp-handbook' ).getSearchResults(),
		};
	} ),
	withDispatch( ( dispatch ) => ( {
		setActiveCategory: dispatch( 'colby/wp-handbook' ).setActiveCategory,
		setActivePost: ( post ) => {
			dispatch( 'colby/wp-handbook' ).setSearchTerm( '' );
			dispatch( 'colby/wp-handbook' ).setActivePost( post );
		},
	} ) ),
] )( Page );
