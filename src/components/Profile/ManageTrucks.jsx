import React, { Component } from 'react';
import { TextField, Tabs, Tab, RaisedButton } from 'material-ui';
import { Link } from 'react-router-dom';
import axios from 'axios';
import propSchema from '../common/PropTypes';

class ManageTrucks extends Component {
  constructor() {
    super();
    this.state = {
      newTruckName: '',
      truckNameEdit: {},
      addTab: 0,
    };
  }

  handleNewTab() {
    const truckTab = [];
    for (let i = 0; i < this.state.addTab; i++) {
      truckTab.push(
        <Tab key={`newtruck${i}`} label="New Truck">
          <TextField
            hintText="Name your Food truck"
            onChange={(e, val) => this.setState({
              newTruckName: val,
            })}
            value={this.state.newTruckName}
          />
        </Tab>,
      );
    }
    return truckTab || null;
  }

  handleTruckEdit() {
    const update = {};
    if (this.state.truckNameEdit.name) {
      update.name = this.state.truckNameEdit.name;
    }
    if (Object.keys(update).length > 0) {
      axios.put(`/api/foodtrucks/${this.state.truckNameEdit.id}`, update)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  handleAddTruck() {
    const newTruck = {};
    newTruck.brand_id = this.props.brandId;
    if (this.state.newTruckName !== '') {
      newTruck.name = this.state.newTruckName;
    }
    if (Object.keys(newTruck).length > 1) {
      axios.post('/api/foodtrucks', newTruck)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  handleSave() {
    this.handleTruckEdit();
    this.handleAddTruck();
  }

  render() {
    return (
      <div>
        <Tabs>
          {this.props.trucks.map((truck, i) => {
            const name = truck.name === 'null' ? `Food Truck ${i + 1}` : truck.name;
            return (
              <Tab key={truck.id} label={name}>
                <TextField
                  hintText="Change your Food truck's Name"
                  onChange={(e, val) => this.setState({
                    truckNameEdit: { name: val, id: truck.id },
                  })}
                  value={this.state.truckNameEdit.name}
                />
              </Tab>
            );
          })}
          {this.handleNewTab()}
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
      </div>
    );
  }
}

ManageTrucks.propTypes = {
  trucks: propSchema.trucks,
  brandId: propSchema.brandId,
};

export default ManageTrucks;
