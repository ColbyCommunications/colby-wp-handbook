/* eslint react/no-danger: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import smoothScroll from 'smoothscroll';

import styles from './studentHandbook.module.scss';

const CategoryButton = ({ active, id, name, slug, pages, activePost }) =>
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
    {active
      ? <div className="mb-2">
        {pages.map((page) =>
            (<div
              key={page.id}
              className="small pl-2 pb-1"
              style={{ fontWeight: page.id === activePost ? '600' : '400' }}
            >
              <Link
                onClick={() =>
                  smoothScroll(
                    document.querySelector('[data-student-handbook]')
                  )}
                to={`/handbook/${page.slug}`}
                dangerouslySetInnerHTML={{ __html: page.title.rendered }}
              />
            </div>)
          )}
      </div>
      : null}
  </div>);

CategoryButton.propTypes = {
  active: PropTypes.bool.isRequired,
  activePost: PropTypes.number,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  slug: PropTypes.string.isRequired,
};

CategoryButton.defaultProps = {
  activePost: null,
};

export default CategoryButton;
