import React from 'react';

import styles from './studentHandbook.module.scss';

import Categories from '../containers/categories-container';
import CurrentPage from '../containers/page-container';
import SearchInputContainer from '../containers/search-input-container';

const StudentHandbook = () =>
  (<div className={`${styles.container} row`}>
    <div className={styles['category-pane']}>
      <SearchInputContainer />
      <Categories />
    </div>
    <div className={styles['page-pane']}>
      <CurrentPage />
    </div>
  </div>);

export default StudentHandbook;
