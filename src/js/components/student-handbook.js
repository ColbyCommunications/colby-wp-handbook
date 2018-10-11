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
		}
	},
} ) )( StudentHandbook );
