import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Geosuggest from 'react-geosuggest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { actions as mapActions } from '../../redux/MapSearch';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.handleSuggestSelect = this.handleSuggestSelect.bind(this);
    this.redirectToMap = this.redirectToMap.bind(this);
  }

  handleSuggestSelect({ location }) {
    const { lat, lng } = location;
    this.props.actions.mapRequest(lat, lng);
    this.setState({
      redirect: true,
    });
  }

  redirectToMap() {
    return this.state.redirect ? <Redirect push to="/map" /> : null;
  }

  render() {
    return (
      // onSuggestSelect axios get trucks near coords of entered address and set on redux store
      <div className="searchBar">
        {this.redirectToMap()}
        <Geosuggest
          className="midin"
          ref={el => this._geoSuggest = el} // eslint-disable-line no-return-assign
          country="us"
          types={['geocode']}
          placeholder="Type your address!"
          onSuggestSelect={(e) => {
            this.handleSuggestSelect(e);
            this._geoSuggest.clear();
          }}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  actions: PropTypes.shape({
    mapRequest: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(mapActions, dispatch),
});

export default connect(null, mapDispatchToProps)(SearchBar);
