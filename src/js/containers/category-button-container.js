import { connect } from 'react-redux';
import CategoryButton from '../components/category-button';
import { setActivePost } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  active: state.categories.activeCategory === ownProps.id,
  pages: state.pages.pages[ownProps.id],
  activePost: state.pages.activePost ? state.pages.activePost.id : null,
  activeCategory: state.categories.categories.filter(
    (category) => category.id === state.categories.activeCategory
  )[0],
});

const mapDispatchToProps = (dispatch) => ({
  setActivePost: (id) => dispatch(setActivePost(id)),
});

const CategoryButtonContainer = connect(mapStateToProps, mapDispatchToProps)(
  CategoryButton
);

export default CategoryButtonContainer;
