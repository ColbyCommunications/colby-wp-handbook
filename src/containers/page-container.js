import { connect } from 'react-redux';
import Page from '../components/page';
import { fetchPage } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  posts: state.search.searchTerm.length
    ? state.search.posts
    : state.pages.pages[state.categories.activeCategory.id],
  searching: state.search.searching,
  searchTerm: state.search.searchTerm,
  activeCategory: state.categories.activeCategory,
});

const PageContainer = connect(mapStateToProps)(Page);

export default PageContainer;
