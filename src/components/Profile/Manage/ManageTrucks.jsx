import React, { Component } from 'react';
import { TextField, Tabs, Tab, FlatButton } from 'material-ui';
import Geosuggest from 'react-geosuggest';
import { Link } from 'react-router-dom';
import axios from 'axios';
import propSchema from '../../common/PropTypes';

class ManageTrucks extends Component {
  constructor() {
    super();
    this.state = {
      newTrucks: [],
      trucksEdit: [],
      addTab: 0,
      truckLocations: [],
    };
    this.handleTruckEdit = this.handleTruckEdit.bind(this);
    this.handleAddTruck = this.handleAddTruck.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
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
    this.state.trucksEdit.forEach((truck) => { // eslint-disable-line consistent-return
      if (truck) {
        return axios.put(`/api/foodtrucks/${truck[1]}`, truck[0])
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
    });
  }

  handleAddTruck() {
    this.state.newTrucks.forEach((truck) => {
      if (truck) {
        return axios.post('/api/foodtrucks', truck)
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
      const newTruck = { name: 'null', brand_id: this.props.brandId };
      return axios.post('/api/foodtrucks', newTruck)
          .then(res => console.log(res))
          .catch(err => console.log(err));
    });
  }

  handleSetCurrentLoc(e, i, id) {
    const truckLocations = [...this.state.truckLocations];
    const newLocation = {
      name: 'no name',
      address: e.gmaps.formatted_address,
      lat: e.location.lat,
      lng: e.location.lng,
    };
    truckLocations[i] = [newLocation, id];
    this.setState({ truckLocations });
  }

  handleLocation() {
    this.state.truckLocations.forEach(location => axios.post('/api/locations', location[0])
        .then((res) => {
          const timeLine = {
            start: new Date().toISOString(),
            truck_id: location[1],
            location_id: res.data.id,
            checked_in: true,
          };
          return axios.post(`/api/foodtrucks/${location[1]}/location`, timeLine)
            .then(() => this.props.getBrand(this.props.brandId))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err)));
  }

  handleCheckout(truckId, timelineId) {
    const end = new Date();
    const endTime = {
      end: end.toISOString(),
      id: timelineId,
      checked_in: false,
    };
    axios.put(`/api/foodtrucks/${truckId}/location`, endTime)
      .then(() => this.props.getBrand(this.props.brandId))
      .catch(err => console.log(err));
    this.takeOrders(truckId, false);
  }

  takeOrders(truckId, takingOrder) {
    axios.put(`/api/foodtrucks/${truckId}/orders`, { order: takingOrder })
      .then(() => this.props.getBrand(this.props.brandId))
      .catch(err => console.log(err));
  }

  handleSave() {
    Promise.all([
      this.handleTruckEdit(),
      this.handleAddTruck(),
      this.handleLocation(),
    ]).then(() => this.props.getBrand(this.props.brandId));
  }

  render() {
    return (
      <div>
        <Tabs className="trucksTabs">
          {this.props.trucks.map((truck, i) => {
            const name = truck.name === 'null' ? `Food Truck ${i + 1}` : truck.name;
            return (
              <Tab key={truck.id} label={name} className="truckTab">
                <TextField
                  className="truckField"
                  hintText="Change your Food truck's Name"
                  onChange={(e, val) => this.handleEditTruckChange(e, val, i, truck.id)}
                />
                <br />
                <Geosuggest
                  className="midin"
                  country="us"
                  types={['geocode']}
                  placeholder="Pick your current location"
                  onSuggestSelect={(e) => {
                    this.handleSetCurrentLoc(e, i, truck.id);
                  }}
                />
                {truck.locations ?
                  <div>
                    <Link to={`/brand/${this.props.brandId}/trucks`}>
                      <FlatButton
                        label="Checkout"
                        onClick={() => this.handleCheckout(truck.id, truck.locations.timeline_id)}
                      />
                    </Link>
                    {truck.order === 0 ?
                      <Link to={`/brand/${this.props.brandId}/trucks`}>
                        <FlatButton
                          label="Take Online Orders"
                          onClick={() => this.takeOrders(truck.id, true)}
                        />
                      </Link>
                      :
                      <Link to={`/brand/${this.props.brandId}/trucks`}>
                        <FlatButton
                          label="Stop taking Online Orders"
                          onClick={() => this.takeOrders(truck.id, false)}
                        />
                      </Link>
                    }
                  </div> : null
                }
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
          <FlatButton
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
