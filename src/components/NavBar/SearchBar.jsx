import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import { actions as mapActions } from '../../redux/MapSearch';
import propSchema from '../common/PropTypes';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      searchRange: 10,
      selectedFoodGenre: 0,
    };
    this.handleSuggestSelect = this.handleSuggestSelect.bind(this);
    this.redirectToMap = this.redirectToMap.bind(this);
    this.handleSearchRangeChange = this.handleSearchRangeChange.bind(this);
    this.handleFoodGenreChange = this.handleFoodGenreChange.bind(this);
  }

  handleSuggestSelect({ location }) {
    const { lat, lng } = location;
    this.props.actions.mapRequest(lat, lng, this.state.searchRange, this.state.selectedFoodGenre);
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

  handleSearchRangeChange(event, index, searchRange) {
    this.setState({ searchRange });
  }

  handleFoodGenreChange(event, index, selectedFoodGenre) {
    this.setState({ selectedFoodGenre });
  }

  render() {
    return (
      // TODO: add distance, genre, review/maybe upvote filtering
      <div className="searchBar">
        {this.redirectToMap()}

        <Toolbar className="toolbar">
          <ToolbarGroup firstChild >
            {/* <TextField*/}
            {/* className="addressEntry"*/}
            {/* hintText="Type in a search address"*/}
            {/* floatingLabelText="Type in a search address"*/}
            {/* fullWidth*/}
            {/* />*/}

            <Geosuggest
              className="addressEntry"
              ref={el => this._geoSuggest = el} // eslint-disable-line no-return-assign
              country="us"
              types={['geocode']}
              placeholder="Type your address!"
              onSuggestSelect={(e) => {
                this.handleSuggestSelect(e);
                this._geoSuggest.clear();
              }}
            />

          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <ToolbarSeparator />
            <DropDownMenu value={this.state.searchRange} onChange={this.handleSearchRangeChange}>
              <MenuItem value={5} primaryText="5 Miles" />
              <MenuItem value={10} primaryText="10 Miles" />
              <MenuItem value={15} primaryText="15 Miles" />
              <MenuItem value={20} primaryText="20 Miles" />
              <MenuItem value={30} primaryText="30 Miles" />
            </DropDownMenu>

            {this.props.foodGenres && this.props.foodGenres.length > 0 &&
            <div>
              <DropDownMenu value={this.state.selectedFoodGenre} onChange={this.handleFoodGenreChange}>
                <MenuItem value={0} primaryText="Any Food" />
                {this.props.foodGenres.map(foodGenre => (
                  <MenuItem value={foodGenre.id} primaryText={foodGenre.name} />
                ))}
              </DropDownMenu>
            </div>
            }
            <RaisedButton label="Search" primary />
          </ToolbarGroup>
        </Toolbar>


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
