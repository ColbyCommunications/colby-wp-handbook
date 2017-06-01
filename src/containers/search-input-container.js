import { connect } from 'react-redux';
import SearchInput from 'colby-react-search-input';

import { runSearch } from '../actions';

const mapStateToProps = (state) => ({
  searchTerm: state.search.searchTerm,
  fetching: state.search.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  handleSearchTermChange: (searchTerm) => dispatch(runSearch(searchTerm)),
});

const SearchInputContainer = connect(mapStateToProps, mapDispatchToProps)(
  SearchInput
);

export default SearchInputContainer;
