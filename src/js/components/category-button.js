/**
 * External depencencies
 */
import { Link } from 'react-router-dom';

/**
 * WordPress dependencies
 */
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';

const CategoryButton = ( {
	active,
	name,
	slug,
	posts,
	activePost,
	setActivePost,
} ) => (
	<div>
		<Link
			to={ `/handbook-section/${ slug }` }
			className={ [
				'btn',
				'btn-primary',
				'category',
				active === true ? 'category--active' : '',
			]
				.join( ' ' )
				.trim() }
			dangerouslySetInnerHTML={ { __html: name } }
		/>
		{ active && posts.length > 1 ? (
			<div className="mb-2">
				{ posts.map(
					( page, i ) =>
						i !== 0 &&
						page.title.rendered !== name && (
							<div
								key={ page.id }
								className="small pl-2 pb-1"
								style={ {
									fontWeight: page.id === activePost ? '600' : '400',
								} }
							>
								<button
									className="sublink"
									onClick={ () => setActivePost( page ) }
									dangerouslySetInnerHTML={ { __html: page.title.rendered } }
								/>
							</div>
						)
				) }
			</div>
		) : null }
	</div>
);

export default compose( [
	withSelect( ( select, ownProps ) => {
		const activePost = select( 'colby/wp-handbook' ).getActivePost();
		const activeCategory = select( 'colby/wp-handbook' ).getActiveCategory();

		return {
			active: activeCategory === ownProps.id,
			posts: select( 'colby/wp-handbook' ).getPosts()[ ownProps.id ],
			activePost: activePost ? activePost.id : null,
			activeCategory: select( 'colby/wp-handbook' )
				.getCategories()
				.filter( ( category ) => category.id === activeCategory )[ 0 ],
		};
	} ),
	withDispatch( ( dispatch ) => ( {
		setActivePost: dispatch( 'colby/wp-handbook' ).setActivePost,
	} ) ),
] )( CategoryButton );
