/* eslint react/no-danger: 0 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from 'colby-scss/modules/student-handbook.scss';

const CategoryButton = ({ active, id, name, onClick }) => (
  <button
    className={[
      styles.category,
      active === true ? styles['category--active'] : '',
    ]
      .join(' ')
      .trim()}
    dangerouslySetInnerHTML={{ __html: name }}
    onClick={() => onClick({ id, title: name })}
  />
);

CategoryButton.propTypes = {
  active: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryButton;
