import React, { Component } from 'react';
import { TextField, SelectField, MenuItem, RaisedButton } from 'material-ui';

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
    console.log('in handle save', this.state);
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
            <MenuItem value={1} primaryText="Burgers" />
            <MenuItem value={2} primaryText="Pho" />
            <MenuItem value={3} primaryText="Mexican" />
            <MenuItem value={4} primaryText="BBQ" />
            <MenuItem value={5} primaryText="Thai" />
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

export default ManageBrand;
