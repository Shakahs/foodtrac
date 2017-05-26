import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, SelectField, MenuItem, RaisedButton } from 'material-ui';
import axios from 'axios';
import propSchema from '../common/PropTypes';

class ManageBasic extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      food_genre_id: 0,
    };
  }

  handleInfoEdit() {
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
    if (Object.keys(update).length > 0) {
      axios.put(`/api/brands/${this.props.brandId}`, update)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div>
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
        <Link to={`/brand/${this.props.brandId}/trucks`}>
          <RaisedButton
            label="Save Changes"
            onClick={() => this.handleInfoEdit()}
          />
        </Link>
      </div>
    );
  }
}

ManageBasic.propTypes = {
  brandId: propSchema.brandId,
  foodGenres: propSchema.foodGenres,
};

const mapStateToProps = ({ foodGenresReducer }) => {
  const { foodGenres } = foodGenresReducer;
  return { foodGenres };
};

export default connect(mapStateToProps, null)(ManageBasic);
