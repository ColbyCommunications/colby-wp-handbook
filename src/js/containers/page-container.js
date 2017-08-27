import { connect } from 'react-redux';
import Page from '../components/page';

const mapStateToProps = (state, ownProps) => {
  let name = '';
  if (state.search.searching === true) {
    name = 'Search Results';
  } else if (state.categories.categories.length) {
    try {
      name = state.categories.categories.filter(
        (category) => category.id === state.categories.activeCategory
      )[0].name;
    } catch (e) {
      name = '';
    }
  }

  return {
    activePost: state.pages.activePost,
    posts: state.search.searchTerm.length
      ? state.search.posts
      : state.pages.pages[state.categories.activeCategory],
    searching: state.search.searching,
    searchTerm: state.search.searchTerm,
    name,
    activeCategory: state.categories.categories.filter(
      (category) => category.id === state.categories.activeCategory
    )[0],
  };
};

const PageContainer = connect(mapStateToProps)(Page);

export default PageContainer;
