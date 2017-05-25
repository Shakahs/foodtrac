import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, SelectField, MenuItem, RaisedButton } from 'material-ui';
import propSchema from '../common/PropTypes';

class ManageBrand extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      foodGenre: '',
    };
  }

  handleSave() {
    console.log('in handle save', this.state); // eslint-disable-line no-console
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
            value={this.state.foodGenre}
            onChange={(e, val) => this.setState({ foodGenre: val })}
            autoWidth
          >
            {this.props.foodGenres.map(genre =>
              <MenuItem key={genre.id} value={genre.id} primaryText={genre.name} />,
            )}
          </SelectField>
          <br />
          <br />
          <RaisedButton
            label="Save Changes"
            onClick={() => this.handleSave()}
          />
        </form>
      </div>
    );
  }
}

ManageBrand.propTypes = {
  foodGenres: propSchema.foodGenres,
};

const mapStateToProps = ({ foodGenresReducer }) => {
  const { foodGenres } = foodGenresReducer;
  return { foodGenres };
};

export default connect(mapStateToProps, null)(ManageBrand);
