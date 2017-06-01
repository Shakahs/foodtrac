import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView from '../common/MapView';
import TrucksList from '../common/TrucksList';
import propSchema from '../common/PropTypes';

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <MapView markers={this.props.markers} path={this.props.match.path} />
        <TrucksList trucks={this.props.trucks} path={this.props.match.path} />
      </div>
    );
  }
}

MapPage.propTypes = {
  markers: propSchema.markers,
  trucks: propSchema.trucks,
  match: propSchema.match,
};

const mapStateToProps = ({ map }) => {
  const { markers, trucks } = map;
  return { markers, trucks };
};

export default connect(mapStateToProps, null)(MapPage);
