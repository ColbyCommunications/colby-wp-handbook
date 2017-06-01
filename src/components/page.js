import React from 'react';
import PropTypes from 'prop-types';

import AnimatedEllipsis from 'colby-react-animated-ellipsis';

import styles from 'colby-scss/modules/student-handbook.scss';

import Post from './post';

const Page = ({ posts, fetching, searchTerm, activeCategory }) => {
  if (fetching === true) {
    return (
      <div className={[styles.page, styles['page--loading']].join(' ').trim()}>
        <AnimatedEllipsis />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.title.rendered}
          content={post.content.rendered}
        />
      ))}
    </div>
  );
};

Page.defaultProps = {
  activeCategory: null,
  posts: [],
  searchTerm: '',
};

Page.propTypes = {
  activeCategory: PropTypes.number,
  fetching: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),
  searchTerm: PropTypes.string,
};

export default Page;
