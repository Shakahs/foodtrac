import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, SelectField, MenuItem, RaisedButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import axios from 'axios';
import propSchema from '../common/PropTypes';

class ManageBrand extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      food_genre_id: 0,
      addTab: 0,
    };
  }

  handleSave() {
    const update = {};
    if (this.state.name !== '') {
      update.name = this.state.name;
    }
    if (this.state.description !== '') {
      update.description = this.state.description;
    }
    if (this.state.food_genre_id > 0) {
      update.food_genre_id = this.state.food_genre_id;
    }
    axios.put(`/api/brands/${this.props.brandId}`, update)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  handleAddTruck() {
    const truckTab = [];
    for (let i = 0; i < this.state.addTab; i++) {
      truckTab.push(
        <Tab key={`newtruck${i}`} label="New Truck">
          <TextField
            hintText="Name your Food truck"
          />
        </Tab>,
      );
    }
    return truckTab || null;
  }

  render() {
    return (
      <div>
        <form>
          <div>Change Basic Information:</div>
          <br />
          <br />
          <TextField
            hintText="Change Brand Name"
            onChange={(e, val) => this.setState({ name: val })}
            value={this.state.name}
          />
          <br />
          <TextField
            hintText="Change Brand Description"
            onChange={(e, val) => this.setState({ description: val })}
            value={this.state.description}
          />
          <br />
          <SelectField
            floatingLabelText="Change Food Genre"
            value={this.state.food_genre_id}
            onChange={(e, i, val) => this.setState({ food_genre_id: val })}
          >
            <MenuItem value={0} />
            {this.props.foodGenres.map(genre =>
              <MenuItem key={genre.id} value={genre.id} primaryText={genre.name} />,
            )}
          </SelectField>
          <br />
          <br />
          <div>Manage Trucks:</div>
          <Tabs>
            <Tab label="Truck 1">
              <TextField
                hintText="Name your Food truck"
              />
            </Tab>
            {this.handleAddTruck()}
            <Tab
              label="Add Truck"
              onClick={() =>
                this.setState({ addTab: this.state.addTab + 1 })
              }
            />
          </Tabs>
          <br />
          <br />
          <Link to={`/brand/${this.props.brandId}/trucks`}>
            <RaisedButton
              label="Save Changes"
              onClick={() => this.handleSave()}
            />
          </Link>
        </form>
      </div>
    );
  }
}

ManageBrand.propTypes = {
  brandId: propSchema.brandId,
  foodGenres: propSchema.foodGenres,
};

const mapStateToProps = ({ foodGenresReducer }) => {
  const { foodGenres } = foodGenresReducer;
  return { foodGenres };
};

export default connect(mapStateToProps, null)(ManageBrand);
