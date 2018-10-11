/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import CategoryButton from './category-button';

const Categories = ( { categories } ) => (
	<div className="categories">
		{ categories.map( ( category ) => (
			<CategoryButton
				key={ category.id }
				id={ category.id }
				name={ category.name }
				slug={ category.slug }
			/>
		) ) }
	</div>
);

export default withSelect( ( select ) => ( {
	categories: select( 'colby/wp-handbook' ).getCategories(),
} ) )( Categories );
