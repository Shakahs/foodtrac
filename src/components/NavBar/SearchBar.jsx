import React, { Component } from 'react';
import MuiGeoSuggest from 'material-ui-geosuggest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { actions as mapActions } from '../../redux/MapSearch';
import propSchema from '../common/PropTypes';


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
    this.props.actions.mapRequest(lat(), lng());
    this.setState({
      redirect: true,
    });
  }

  redirectToMap() {
    if (this.state.redirect) {
      this.setState({
        redirect: false,
      });
      return <Redirect push to="/map" />;
    }
    return null;
  }

  render() {
    return (
      // onSuggestSelect axios get trucks near coords of entered address and set on redux store
      <div className="searchBar">
        {this.redirectToMap()}
        <MuiGeoSuggest
          hintText="Type your address!"
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
          options={{
            types: ['address'],
            componentRestrictions: { country: 'us' },
          }}
          onPlaceChange={(e) => {
            this.handleSuggestSelect(e.geometry);
            this.setState({ value: '' });
          }}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  actions: propSchema.actions,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(mapActions, dispatch),
});

export default connect(null, mapDispatchToProps)(SearchBar);
