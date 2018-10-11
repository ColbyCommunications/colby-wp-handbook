/**
 * External dependencies
 */
import { createBrowserHistory } from 'history';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

/**
 * WordPress dependencies
 */
import { registerStore, combineReducers } from '@wordpress/data';

/**
 * Internal dependencies
 */
import * as reducers from './reducers';
import * as actions from './actions';
import * as selectors from './selectors';

export const STORE_NAME = 'colby/wp-handbook';
export const history = createBrowserHistory( {
	basename: global.colbyWpHandbook.sitePath,
} );

const routerHistoryMiddleware = routerMiddleware( history );
const middlewares = [ thunkMiddleware, routerHistoryMiddleware ];

export const store = registerStore(
	STORE_NAME,
	{
		reducer: connectRouter( history )( combineReducers( reducers ) ),
		actions,
		selectors,
	},
	applyMiddleware( ...middlewares )
);
