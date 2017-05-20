import React, { Component } from 'react';
import MapView from './MapView';
import TrucksList from './TrucksList';

class MapPage extends Component {
  constrictor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <MapView />
        <TrucksList />
      </div>
    );
  }
}

export default MapPage;
