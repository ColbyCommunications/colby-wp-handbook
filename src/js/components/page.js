/* eslint react/no-danger: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AnimatedEllipsis from 'colby-react-animated-ellipsis';

import styles from './studentHandbook.module.scss';

import Post from './post';

const Page = ({
  searching,
  searchTerm,
  clearSearchTerm,
  activeCategory,
  name,
  posts,
  activePost,
}) => {
  if (searching === true) {
    return (
      <div className={[styles.page, styles['page--loading']].join(' ').trim()}>
        <AnimatedEllipsis />
      </div>
    );
  }

  if (activePost !== null) {
    return (
      <div className={styles.page}>
        <Post {...activePost} />
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
    <div className={styles.page}>
      {title}
      {searchTerm !== ''
        ? posts.map((post) =>
          (<div key={post.id}>
            <Link
              key={post.id}
              to={`/handbook/${post.slug}`}
              onClick={() => {
                clearSearchTerm();
              }}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </div>)
          )
        : posts.map((post, i) =>
          (<Post
            activeCategory={activeCategory}
            postsLength={posts.length}
            key={post.id}
            index={i}
            {...post}
          />)
          )}
    </div>
  );
};

Page.propTypes = {
  activeCategory: PropTypes.objectOf(PropTypes.any),
  activePost: PropTypes.objectOf(PropTypes.any),
  clearSearchTerm: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  searching: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),
  searchTerm: PropTypes.string.isRequired,
};

Page.defaultProps = {
  activeCategory: null,
  activePost: null,
  posts: [],
};

export default Page;
