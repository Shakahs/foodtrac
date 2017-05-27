import React, { Component } from 'react';
import { TextField, SelectField, MenuItem, FlatButton } from 'material-ui';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import propSchema from '../common/PropTypes';
import { actions as userActions } from '../../redux/user';
import AddTrucksView from './AddTrucksView';


class AddBrandsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      desc: '',
      trucks: [],
      count: 1,
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
      // TODO: Replace with id of logged in user, add food genres to select
      food_genre_id: 1,
      owner_id: 1,
      trucks: this.state.trucks,
    };
    axios.post('/api/brands', body)
      .then(() => this.setState({ name: '', desc: '', truck: [], count: 1 }))
      .catch(err => console.log(err));
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
            hintText="Brand Name"
            onChange={(e, val) => this.setState({ name: val })}
            value={this.state.name}
          />
          <TextField
            hintText="Brand Description"
            onChange={(e, val) => this.setState({ desc: val })}
            value={this.state.desc}
          />
          <SelectField
            floatingLabelText="Food Genres"
          >
            <MenuItem />
          </SelectField>
          {this.renderAddTruckViews()}
          <FlatButton
            label="Add another truck"
            type="button"
            onClick={() => this.setState({ count: this.state.count + 1 })}
          />
          <FlatButton label="Submit" type="submit" primary />
        </form>
      </div>
    );
  }
}

AddBrandsView.propTypes = {
  userActions: propSchema.userActions,
};

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(null, mapDispatchToProps)(AddBrandsView);

