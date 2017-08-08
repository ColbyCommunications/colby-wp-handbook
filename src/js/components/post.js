/* eslint react/no-danger: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './studentHandbook.module.scss';

export default function Post({ id, title, content, link, slug }) {
  return (
    <div className={styles.post}>
      <h1 className={styles['post-title']} id={`post-${id}`}>
        <Link
          to={`/${slug}`}
          dangerouslySetInnerHTML={{ __html: title.rendered }}
        />
      </h1>
      <p dangerouslySetInnerHTML={{ __html: content.rendered }} />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.any).isRequired,
  slug: PropTypes.string.isRequired,
};
