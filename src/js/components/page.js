/* eslint react/no-danger: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import AnimatedEllipsis from 'colby-react-animated-ellipsis';

import styles from './studentHandbook.module.scss';

import Post from './post';

const Page = ({
  searching,
  searchTerm,
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
        <h2 dangerouslySetInnerHTML={activePost.title.rendered} />
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
      {posts.map((post) => <Post key={post.id} {...post} />)}
    </div>
  );
};

Page.propTypes = {
  activeCategory: PropTypes.number,
  activePost: PropTypes.objectOf(PropTypes.any),
  name: PropTypes.string.isRequired,
  searching: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchTerm: PropTypes.string.isRequired,
};

Page.defaultProps = {
  activeCategory: null,
  activePost: null,
};

export default Page;
