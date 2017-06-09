import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { actions as mapActions } from '../../redux/MapSearch';
import propSchema from '../common/PropTypes';
import './SearchBar.scss';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      searchLocation: {
        lat: null,
        lng: null,
      },
      searchRange: 10,
      searchFoodGenre: 0,
    };
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.redirectToMap = this.redirectToMap.bind(this);
    this.handleSearchRangeChange = this.handleSearchRangeChange.bind(this);
    this.handleFoodGenreChange = this.handleFoodGenreChange.bind(this);
    this.sendMapSearch = this.sendMapSearch.bind(this);
  }

  sendMapSearch() {
    this.props.actions.mapRequest(this.state.searchLocation.lat,
      this.state.searchLocation.lng,
      this.state.searchRange,
      this.state.searchFoodGenre);
  }

  handleLocationSelect({ location }) {
    const { lat, lng } = location;
    this.setState({
      redirect: true,
      searchLocation: { lat, lng },
    }, this.sendMapSearch);
  }

  handleSearchRangeChange(event, index, searchRange) {
    this.setState({ searchRange }, this.sendMapSearch);
  }

  handleFoodGenreChange(event, index, searchFoodGenre) {
    this.setState({ searchFoodGenre }, this.sendMapSearch);
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
      <div className="searchBar">
        {this.redirectToMap()}

        <Geosuggest
          className="addressEntry"
          ref={el => this._geoSuggest = el} // eslint-disable-line no-return-assign
          country="us"
          types={['geocode']}
          placeholder="Type your address!"
          onSuggestSelect={(e) => {
            this.handleLocationSelect(e);
          }}
        />

        <DropDownMenu value={this.state.searchRange} onChange={this.handleSearchRangeChange}>
          <MenuItem value={5} primaryText="5 Miles" />
          <MenuItem value={10} primaryText="10 Miles" />
          <MenuItem value={15} primaryText="15 Miles" />
          <MenuItem value={20} primaryText="20 Miles" />
          <MenuItem value={30} primaryText="30 Miles" />
        </DropDownMenu>

        {this.props.foodGenres && this.props.foodGenres.length > 0 &&
          <DropDownMenu value={this.state.searchFoodGenre} onChange={this.handleFoodGenreChange}>
            <MenuItem value={0} primaryText="Any Food" />
            {this.props.foodGenres.map(foodGenre => (
              <MenuItem value={foodGenre.id} primaryText={foodGenre.name} />
                ))}
          </DropDownMenu>}
        <RaisedButton className="location-search-btn" label="Search" primary />
      </div>
    );
  }
}

SearchBar.propTypes = {
  actions: propSchema.actions,
  foodGenres: propSchema.foodGenres,
};

SearchBar.defaultProps = {
  foodGenres: [],
};

const mapStateToProps = state => ({
  foodGenres: state.foodGenresReducer.foodGenres,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(mapActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
