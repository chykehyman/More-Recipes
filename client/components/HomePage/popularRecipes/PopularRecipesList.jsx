import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PopularRecipe from './PopularRecipe.jsx';
import { fetchRecipeRequest } from '../../../actions/actionCreators/popularRecipesActions';

class PopularRecipesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: ''
        };
    }
    componentDidMount() {
        let popularRecipes = '';
        this.props.fetchRecipeRequest(() => {
            console.log(this.props.fetchedPopularRecipes.length, this.props.isRecipeFetching);
            if (this.props.fetchedPopularRecipes.length === 0) {
                popularRecipes = <div className='display-4 text-center text-danger'>There are no available recipes to display</div>;
            } else {
                popularRecipes = this.props.fetchedPopularRecipes.map(popularRecipe =>
                <PopularRecipe key={popularRecipe.id} popularRecipe={popularRecipe} />);
            }
            this.setState({ display: popularRecipes });
        });
    }

  render() {
    return (
      <div className='row'>{this.state.display}</div>
    );
  }
}

PopularRecipesList.propTypes = {
    isRecipeFetching: PropTypes.bool.isRequired,
    fetchedPopularRecipes: PropTypes.array.isRequired,
    fetchRecipeRequest: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isRecipeFetching: state.popularRecipes.isPopularRecipesFetching,
    fetchedPopularRecipes: state.popularRecipes.fetchedPopularRecipes
  };
}

export default connect(mapStateToProps, { fetchRecipeRequest })(PopularRecipesList);