import { connect } from 'react-redux';
import CategoryButton from '../components/category-button';

const mapStateToProps = (state, ownProps) => ({
  active: state.categories.activeCategory === ownProps.id,
  pages: state.pages.pages[ownProps.id],
  activePost: state.pages.activePost ? state.pages.activePost.id : null,
});

const CategoryButtonContainer = connect(mapStateToProps)(CategoryButton);

export default CategoryButtonContainer;
