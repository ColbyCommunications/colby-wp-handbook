/* eslint react/no-danger: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './studentHandbook.module.scss';

const CategoryButton = ({ active, id, name, onClick }) =>
  (<Link
    to="/"
    className={[
      'btn',
      'btn-primary',
      styles.category,
      active === true ? styles['category--active'] : '',
    ]
      .join(' ')
      .trim()}
    dangerouslySetInnerHTML={{ __html: name }}
    onClick={() => onClick(id)}
  />);

CategoryButton.propTypes = {
  active: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryButton;
