/* eslint react/no-danger: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AnimatedEllipsis from 'colby-react-animated-ellipsis';

import styles from './studentHandbook.module.scss';

import Post from './post';

class Page extends React.Component {
  render() {
    const {
      searching,
      searchTerm,
      categories,
      activeCategory,
      name,
      posts,
      setActivePost,
    } = this.props;
    if (searching === true) {
      return (
        <div
          className={[styles.page, styles['page--loading']].join(' ').trim()}
        >
          <AnimatedEllipsis />
        </div>
      );
    }

    const title =
      searchTerm !== ''
        ? (<h2>
            Results for <i>{searchTerm}</i>
        </h2>)
        : (<h2>
          {name}
        </h2>);

    return (
      <div
        className={styles.page}
        ref={(container) => {
          this.container = container;
        }}
      >
        {title}
        {searchTerm !== ''
          ? posts.map((post) =>
            (<div key={post.id}>
              <Link
                key={post.id}
                onClick={() => setActivePost(post)}
                to={`/handbook-section/${post.categorySlug}`}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </div>)
            )
          : posts.map((post, i) =>
            (<Post
              activeCategory={activeCategory}
              active={post.id === this.props.activePost.id}
              postsLength={posts.length}
              key={post.id}
              categories={categories}
              index={i}
              {...post}
            />)
            )}
      </div>
    );
  }
}

Page.propTypes = {
  activeCategory: PropTypes.number.isRequired,
  activePost: PropTypes.objectOf(PropTypes.any).isRequired,
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
  searching: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),
  searchTerm: PropTypes.string.isRequired,
  setActivePost: PropTypes.func.isRequired,
};

Page.defaultProps = {
  activeCategory: null,
  posts: [],
};

export default Page;
