/* eslint react/no-danger: 0 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from 'colby-scss/modules/student-handbook.scss';

export default function Club({ title, content }) {
  return (
    <div className={styles.club}>
      <h1
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

Club.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
