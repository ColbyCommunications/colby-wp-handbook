import { connect } from 'react-redux';
import Categories from '../components/categories';

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
});

const CategoriesContainer = connect(mapStateToProps)(Categories);

export default CategoriesContainer;
