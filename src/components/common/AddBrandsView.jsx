import React, { Component } from 'react';
import _ from 'lodash';
import { TextField, SelectField, MenuItem, FlatButton } from 'material-ui';
import Snackbar from 'material-ui/Snackbar';
import propSchema from '../common/PropTypes';
import AddTrucksView from './AddTrucksView';


class AddBrandsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      desc: '',
      trucks: [],
      count: 1,
      genre: 1,
      open: false,
    };

    props.userActions.redirectAddBrandDisable();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderAddTruckViews = this.renderAddTruckViews.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const body = {
      name: this.state.name,
      description: this.state.desc,
      food_genre_id: this.state.genre,
      owner_id: this.props.user.id,
      trucks: this.state.trucks,
    };
    this.props.userActions.addBrandRequest(body);
    this.setState({ name: '', desc: '', trucks: [], count: 1, open: true });
  }

  handleTruckChange(i, e, val) {
    const trucks = [...this.state.trucks];
    trucks[i] = { name: val };
    this.setState({ trucks });
  }

  removeClick(i) {
    const trucks = [...this.state.trucks];
    trucks.splice(i, 1);
    this.setState({
      count: this.state.count - 1,
      trucks,
    });
  }

  renderAddTruckViews() {
    const uiItems = [];
    for (let i = 0; i < this.state.count; i++) {
      const handleChangeCopy = this.handleTruckChange.bind(this, i);
      const removeTruckCopy = this.removeClick.bind(this, i);
      uiItems.push(
        <AddTrucksView
          handleChange={handleChangeCopy}
          val={this.state.trucks[i] ? this.state.trucks[i].name : ''}
          idx={i}
          removeEntry={removeTruckCopy}
        />,
      );
    }
    return uiItems || null;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            floatingLabelText="Brand Name"
            name="name"
            hintText="Brand Name"
            onChange={(e, val) => this.setState({ name: val })}
            value={this.state.name}
            required
          />
          <TextField
            floatingLabelText="Brand Description"
            hintText="Brand Description"
            name="description"
            onChange={(e, val) => this.setState({ desc: val })}
            value={this.state.desc}
            required
          />
          <SelectField
            name="food_genre_id"
            floatingLabelText="Food Genres"
            onChange={(e, i, val) => this.setState({ genre: val })}
            value={this.state.genre}
          >
            {_.map(this.props.foodGenres, genre =>
              <MenuItem value={genre.id} primaryText={genre.name} />)}
          </SelectField>
          {this.renderAddTruckViews()}
          <FlatButton
            label="Add another truck"
            type="button"
            onClick={() => this.setState({ count: this.state.count + 1 })}
          />
          <FlatButton label="Submit" type="submit" primary />
        </form>
        <Snackbar
          open={this.state.open}
          autoHideDuration={3000}
          message="Added new brand"
        />
      </div>
    );
  }
}

AddBrandsView.propTypes = {
  userActions: propSchema.userActions,
  user: propSchema.user,
  foodGenres: propSchema.foodGenres,
};

export default AddBrandsView;

