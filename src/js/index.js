/**
 * External dependencies.
 */
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import domReady from '@wordpress/dom-ready';
import { dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { store, history, STORE_NAME } from './store';
import StudentHandbook from './components/student-handbook';

apiFetch.use( apiFetch.createRootURLMiddleware( global.colbyWpHandbook.restUrl ) );

const fetchCategories = () =>
	new Promise( async ( resolve ) => {
		const categories = await apiFetch( {
			path: 'handbook-section?per_page=99&orderby=slug&order=asc',
		} );
		dispatch( STORE_NAME ).setCategories( categories );
		resolve();
	} );

const fetchPosts = () =>
	new Promise( async ( resolve ) => {
		const posts = await apiFetch( {
			path: 'handbook-page?per_page=99&orderby=slug&order=asc',
		} );

		const categorizedPosts = {};
		posts.forEach( ( post ) => {
			post[ 'handbook-section' ].forEach( ( section ) => {
				if ( ! categorizedPosts[ section ] ) {
					categorizedPosts[ section ] = [];
				}

				categorizedPosts[ section ].push( post );
			} );
		} );

		dispatch( STORE_NAME ).setPosts( categorizedPosts );
		resolve();
	} );

const App = () => (
	<Provider store={ store }>
		<ConnectedRouter history={ history }>
			<div className="container">
				<Switch>
					<Route
						path="/handbook"
						render={ ( props ) => <StudentHandbook { ...props } /> }
					/>
					<Route
						path="/handbook-section/:slug"
						render={ ( props ) => (
							<StudentHandbook categorySlug={ props.match.params.slug } />
						) }
					/>
					<Route
						path="/handbook/:slug"
						render={ ( props ) => (
							<StudentHandbook postSlug={ props.match.params.slug } />
						) }
					/>
				</Switch>
			</div>
		</ConnectedRouter>
	</Provider>
);

domReady( async () => {
	const container = document.querySelector( '[data-student-handbook]' );
	if ( container ) {
		await fetchCategories();
		await fetchPosts();
		render( <App />, container );
	}
} );
