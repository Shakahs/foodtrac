import React, { Component } from 'react';
import { TextField, Tabs, Tab, RaisedButton, FlatButton } from 'material-ui';
import MuiGeoSuggest from 'material-ui-geosuggest';
import { Link } from 'react-router-dom';
import axios from 'axios';
import propSchema from '../common/PropTypes';

class ManageTrucks extends Component {
  constructor() {
    super();
    this.state = {
      newTrucks: [],
      trucksEdit: [],
      addTab: 0,
      truckLocations: [],
    };
  }

  handleNewTruckChange(e, val, i) {
    const newTrucks = [...this.state.newTrucks];
    val = val === '' ? 'null' : val; // eslint-disable-line no-param-reassign
    newTrucks[i] = { name: val, brand_id: this.props.brandId };
    this.setState({ newTrucks });
  }

  handleEditTruckChange(e, val, i, id) {
    const trucksEdit = [...this.state.trucksEdit];
    val = val === '' ? 'null' : val; // eslint-disable-line no-param-reassign
    trucksEdit[i] = [{ name: val }, id];
    this.setState({ trucksEdit });
  }

  handleNewTab() {
    const truckTab = [];
    for (let i = 0; i < this.state.addTab; i++) {
      truckTab.push(
        <Tab key={`newtruck${i}`} label="New Truck">
          <TextField
            hintText="Name your Food truck"
            onChange={(e, val) => this.handleNewTruckChange(e, val, i)}
          />
          <FlatButton
            label="Remove"
            type="button"
            onClick={() => this.removeClick(i)}
          />
        </Tab>,
      );
    }
    return truckTab || null;
  }

  removeClick(i) {
    const newTrucks = [...this.state.newTrucks];
    newTrucks.splice(i, 1);
    this.setState({
      addTab: this.state.addTab - 1,
      newTrucks,
    });
  }

  handleTruckEdit() {
    this.state.trucksEdit.forEach((truck) => {
      axios.put(`/api/foodtrucks/${truck[1]}`, truck[0])
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });
  }

  handleAddTruck() {
    this.state.newTrucks.forEach((truck) => {
      if (truck) {
        axios.post('/api/foodtrucks', truck)
          .then(res => console.log(res))
          .catch(err => console.log(err));
      } else {
        const newTruck = { name: 'null', brand_id: this.props.brandId };
        axios.post('/api/foodtrucks', newTruck)
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
    });
  }

  handleSetCurrentLoc(e, i, id) {
    const truckLocations = [...this.state.truckLocations];
    const newLocation = {
      name: 'no name',
      address: e.formatted_address,
      lat: e.geometry.location.lat(),
      lng: e.geometry.location.lng(),
    };
    truckLocations[i] = [newLocation, id];
    this.setState({ truckLocations });
  }

  handleLocation() {
    this.state.truckLocations.forEach((location) => {
      axios.post('/api/locations', location[0])
        .then((res) => {
          const timeLine = {
            start: new Date().toISOString(),
            truck_id: location[1],
            location_id: res.data.id,
            checked_in: true,
          };
          axios.post(`/api/foodtrucks/${location[1]}/location`, timeLine)
            .then(resp => console.log(resp))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  }

  handleSave() {
    this.handleTruckEdit();
    this.handleAddTruck();
    this.handleLocation();
    this.props.getBrand(this.props.brandId);
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
                  onChange={(e, val) => this.handleEditTruckChange(e, val, i, truck.id)}
                />
                <br />
                <MuiGeoSuggest
                  hintText="Pick your current location"
                  options={{
                    types: ['address'],
                    componentRestrictions: { country: 'us' },
                  }}
                  onPlaceChange={e => this.handleSetCurrentLoc(e, i, truck.id)}
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
  getBrand: propSchema.getBrand,
};

export default ManageTrucks;
