import React, {Component} from 'react';
import MapView from './MapView.jsx';
import SelectedTruck from './SelectedTruck.jsx';
import FeedList from './FeedList.jsx';

class DashBoard extends Component {

  render() {
    return (
      <div>
        <MapView />
        <SelectedTruck />
        <FeedList />
      </div>
    );
  };
}

export default DashBoard;