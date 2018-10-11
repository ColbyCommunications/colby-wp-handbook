/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

class Post extends Component {
	constructor( props ) {
		super( props );

		this.scrollTo = this.scrollTo.bind( this );
	}

	componentDidMount() {
		if ( this.props.active === true ) {
			this.scrollTo();
		}
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.active === true && prevProps.active !== true ) {
			global.setTimeout( this.scrollTo, 25 );
		}
	}

	scrollTo() {
		if ( 'post' in this ) {
			const offset = 90;
			const bodyRect = document.body.getBoundingClientRect().top;
			const elementRect = this.post.getBoundingClientRect().top;
			const elementPosition = elementRect - bodyRect;
			const offsetPosition = elementPosition - offset;

			window.scrollTo( {
				top: offsetPosition,
				behavior: 'smooth',
			} );
		}
	}

	render() {
		const {
			activeCategory,
			categories,
			id,
			index,
			title,
			content,
		} = this.props;

		return (
			<div
				className="post"
				ref={ ( post ) => {
					this.post = post;
				} }
			>
				{ index === 0 &&
				categories.filter( ( category ) => category.id === activeCategory )[ 0 ]
					.name === title.rendered ? null : (
						<h1
							className="post-title"
							id={ `post-${ id }` }
							dangerouslySetInnerHTML={ { __html: title.rendered } }
						/>
					) }
				<p dangerouslySetInnerHTML={ { __html: content.rendered } } />
			</div>
		);
	}
}

export default Post;
