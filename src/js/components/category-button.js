/* eslint react/no-danger: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import smoothScroll from 'smoothscroll';

import styles from './studentHandbook.module.scss';

const CategoryButton = ({
  active,
  id,
  name,
  slug,
  pages,
  activePost,
  activeCategory,
}) =>
  (<div>
    <Link
      to={`/handbook-section/${slug}`}
      onClick={() =>
        smoothScroll(document.querySelector('[data-student-handbook]'))}
      className={[
        'btn',
        'btn-primary',
        styles.category,
        active === true ? styles['category--active'] : '',
      ]
        .join(' ')
        .trim()}
      dangerouslySetInnerHTML={{ __html: name }}
    />
    {active && pages.length > 1
      ? <div className="mb-2">
        {pages.map((page, i) => {
          if (i === 0 && page.title.rendered === name) {
            return null;
          }
          return (
            <div
              key={page.id}
              className="small pl-2 pb-1"
              style={{
                fontWeight: page.id === activePost ? '600' : '400',
              }}
            >
              <Link
                onClick={() =>
                    smoothScroll(
                      document.querySelector('[data-student-handbook]')
                    )}
                to={`/handbook/${page.slug}`}
                dangerouslySetInnerHTML={{ __html: page.title.rendered }}
              />
            </div>
          );
        })}
      </div>
      : null}
  </div>);

CategoryButton.propTypes = {
  active: PropTypes.bool.isRequired,
  activeCategory: PropTypes.objectOf(PropTypes.any),
  activePost: PropTypes.number,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  slug: PropTypes.string.isRequired,
};

CategoryButton.defaultProps = {
  activeCategory: null,
  activePost: null,
};

export default CategoryButton;
