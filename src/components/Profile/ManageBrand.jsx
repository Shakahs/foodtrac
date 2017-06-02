import React from 'react';
import { Tabs, Tab } from 'material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import propSchema from '../common/PropTypes';
import ManageBasic from './ManageBasic';
import ManageTrucks from './ManageTrucks';
import ManageMenu from './ManageMenu';
import { actions as userActions } from '../../redux/user';

class ManageBrand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      food_genre_id: 0,
    };

    this.handleInfoEdit = this.handleInfoEdit.bind(this);
    this.handleReduxUpdate = this.handleReduxUpdate.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleInfoEdit(data) {
    const update = {};
    if (data.name !== '') {
      update.name = data.name;
    }
    if (data.description !== '') {
      update.description = data.description;
    }
    if (data.food_genre_id > 0) {
      update.food_genre_id = data.food_genre_id;
    }
    if (Object.keys(update).length > 0) {
      axios.put(`/api/brands/${this.props.brandId}`, update)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    axios.put(`/api/brands/${this.props.brandId}`, update)
      .then(() => this.props.getBrand(this.props.brandId))
      .catch(err => console.log(err));
  }

  handleReduxUpdate(data) {
    let index;
    this.props.user.brands.forEach((brand, i) => {
      if (brand.id === this.props.brandId) {
        index = i;
      }
    });
    const brandsCopy = [...this.props.user.brands];
    const newBrands = brandsCopy.map(brand => Object.assign({}, brand));
    if (data.name !== '' && data.name) {
      newBrands[index].name = data.name;
    }
    if (data.description !== '' && data.description) {
      newBrands[index].description = data.description;
    }
    if (data.food_genre_id > 0 && data.food_genre_id) {
      newBrands[index].food_genre_id = data.food_genre_id;
    }
    this.props.userActions.brandInfoUpdate(newBrands);
  }

  handleSave(data) {
    this.handleInfoEdit(data);
    this.handleReduxUpdate(data);
  }

  render() {
    return (
      <Tabs>
        <Tab label="Change Basic Brand Info">
          <ManageBasic
            brandId={this.props.brandId}
            getBrand={this.props.getBrand}
            onSubmit={this.handleSave}
            foodGenres={this.props.foodGenres}
          />
        </Tab>
        <Tab label="Manage Your Trucks">
          <ManageTrucks
            brandId={this.props.brandId}
            trucks={this.props.trucks}
            getBrand={this.props.getBrand}
          />
        </Tab>
        <Tab label="Edit your Menu">
          <ManageMenu
            brandId={this.props.brandId}
            menuItems={this.props.menuItems}
            getBrand={this.props.getBrand}
          />
        </Tab>
      </Tabs>
    );
  }
}

ManageBrand.propTypes = {
  trucks: propSchema.trucks,
  brandId: propSchema.brandId,
  getBrand: propSchema.getBrand,
  foodGenres: propSchema.foodGenres,
  userActions: propSchema.userActions,
  user: propSchema.user,
  menuItems: propSchema.menuItems,
};

const mapStateToProps = state => ({
  user: state.user,
  foodGenres: state.foodGenresReducer.foodGenres,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageBrand);
