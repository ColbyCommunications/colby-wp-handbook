/* eslint react/no-danger: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './studentHandbook.module.scss';

export default function Post({
  activeCategory,
  id,
  index,
  title,
  content,
  link,
  postsLength,
  slug,
}) {
  return (
    <div className={styles.post}>
      {index === 0 && activeCategory.name === title.rendered
        ? null
        : <h1 className={styles['post-title']} id={`post-${id}`}>
          <Link
            to={`/handbook/${slug}`}
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          />
        </h1>}
      <p dangerouslySetInnerHTML={{ __html: content.rendered }} />
    </div>
  );
}

Post.propTypes = {
  activeCategory: PropTypes.objectOf(PropTypes.any),
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  postsLength: PropTypes.number.isRequired,
  title: PropTypes.objectOf(PropTypes.any).isRequired,
  slug: PropTypes.string.isRequired,
};

Post.defaultProps = {
  activeCategory: null,
};
