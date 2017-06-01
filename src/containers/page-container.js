import { connect } from 'react-redux';
import Page from '../components/page';

const mapStateToProps = (state, ownProps) => ({
  posts: state.search.searchTerm.length ? state.search.posts : state.page.posts,
  fetching: state.page.fetching || state.search.fetching,
  searchTerm: state.search.searchTerm,
  activeCategory: state.categories.activeCategory,
});

const PageContainer = connect(mapStateToProps)(Page);

export default PageContainer;
