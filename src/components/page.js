import React from 'react';
import PropTypes from 'prop-types';

import AnimatedEllipsis from 'colby-react-animated-ellipsis';

import styles from 'colby-scss/modules/student-handbook.scss';

import Post from './post';

const Page = ({ searching, searchTerm, activeCategory, posts }) => {
  if (searching === true) {
    return (
      <div className={[styles.page, styles['page--loading']].join(' ').trim()}>
        <AnimatedEllipsis />
      </div>
    );
  }

  const title = searchTerm !== ''
    ? <h2>Results for <i>{searchTerm}</i></h2>
    : <h2>{activeCategory.name}</h2>;

  return (
    <div className={styles.page}>
      {title}
      {posts.map((post) => <Post key={post.id} {...post} />)}
    </div>
  );
};

Page.propTypes = {
  activeCategory: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
    ])
  ).isRequired,
  searching: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default Page;
