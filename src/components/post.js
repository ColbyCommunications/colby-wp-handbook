/* eslint react/no-danger: 0 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from 'colby-scss/modules/student-handbook.scss';

export default function Post({ id, title, content, link }) {
  return (
    <div className={styles.post}>
      <h1 className={styles['post-title']} id={`post-${id}`}>
        <a href={link} dangerouslySetInnerHTML={{ __html: title }} />
      </h1>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
