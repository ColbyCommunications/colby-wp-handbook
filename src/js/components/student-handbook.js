/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { withDispatch, select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Categories from './categories';
import CurrentPage from './page';
import SearchInputContainer from './search-input';

/**
 * Styles
 */
import './style.scss';

class StudentHandbook extends Component {
	componentDidMount() {
		this.props.onUpdate();
	}

	componentDidUpdate() {
		this.props.onUpdate();
	}

	render() {
		return (
			<div className="container row">
				<div className="category-pane">
					<SearchInputContainer />
					<Categories />
				</div>
				<div className="page-pane">
					<CurrentPage />
				</div>
			</div>
		);
	}
}

export default withDispatch( ( dispatch, ownProps ) => ( {
	onUpdate: () => {
		if ( ownProps.categorySlug ) {
			const activeCategory = Object.values(
				select( 'colby/wp-handbook' ).getCategories()
			).filter( ( category ) => category.slug === ownProps.categorySlug )[ 0 ];

			if ( ! select( 'colby/wp-handbook' ).getActivePost() ) {
				dispatch( 'colby/wp-handbook' ).setActivePost(
					select( 'colby/wp-handbook' ).getPosts()[ activeCategory.id ][ 0 ]
				);
			}
			dispatch( 'colby/wp-handbook' ).setActiveCategory( activeCategory.id );
		} else if ( ownProps.postSlug ) {
			let postsArray = [];
			Object.values( select( 'colby/wp-handbook' ).getPosts() ).forEach( ( array ) => {
				postsArray = postsArray.concat( array );
			} );

			const activePosts = postsArray.filter(
				( post ) => post.slug && post.slug === ownProps.postSlug
			);

			dispatch( 'colby/wp-handbook' ).setActivePost( activePosts[ 0 ] );
			dispatch( 'colby/wp-handbook' ).setActiveCategory(
				activePosts[ 0 ][ 'handbook-section' ][ 0 ]
			);
		} else {
			const categories = select( 'colby/wp-handbook' ).getCategories();
			const posts = select( 'colby/wp-handbook' ).getPosts();

			dispatch( 'colby/wp-handbook' ).setActiveCategory( categories[ 0 ].id );

			if (
				categories.length > 0 &&
				categories[ 0 ].id in posts &&
				posts[ categories[ 0 ].id ] &&
				posts[ categories[ 0 ].id ].length > 0
			) {
				dispatch( 'colby/wp-handbook' ).setActivePost( posts[ categories[ 0 ].id ][ 0 ] );
			}
		}
	},
} ) )( StudentHandbook );
