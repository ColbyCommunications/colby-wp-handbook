/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';

const SearchInput = ( { value, onChange } ) => (
	<TextControl value={ value } onChange={ onChange } placeholder="Search" />
);

export default compose( [
	withSelect( ( select ) => ( {
		value: select( 'colby/wp-handbook' ).getSearchTerm(),
	} ) ),
	withDispatch( ( dispatch ) => ( {
		onChange: ( searchTerm ) => {
			dispatch( 'colby/wp-handbook' ).setSearchTerm( searchTerm );
			dispatch( 'colby/wp-handbook' ).search();
		},
	} ) ),
] )( SearchInput );
