/* eslint react/no-danger: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import smoothScroll from 'smoothscroll';
import styles from './studentHandbook.module.scss';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.scrollTo = this.scrollTo.bind(this);
  }

  componentDidMount() {
    if (this.props.active === true) {
      this.scrollTo();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.active === true && prevProps.active !== true) {
      this.scrollTo();
    }
  }

  scrollTo() {
    smoothScroll(this.post);
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
        className={styles.post}
        ref={(post) => {
          this.post = post;
        }}
      >
        {index === 0 &&
        categories.filter((category) => category.id === activeCategory)[0]
          .name === title.rendered
          ? null
          : <h1
            className={styles['post-title']}
            id={`post-${id}`}
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          />}
        <p dangerouslySetInnerHTML={{ __html: content.rendered }} />
      </div>
    );
  }
}

Post.propTypes = {
  active: PropTypes.bool.isRequired,
  activeCategory: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number,
  title: PropTypes.objectOf(PropTypes.any).isRequired,
};

Post.defaultProps = {
  activeCategory: null,
  index: 0,
};

export default Post;
