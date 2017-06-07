import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
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
    this.props.actions.mapRequest(lat, lng);
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
      // TODO: add distance, genre, review/maybe upvote filtering
      <div className="searchBar">
        {this.redirectToMap()}

        <Toolbar >
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
            <RaisedButton label="Options" secondary />
            <RaisedButton label="Search" primary />
          </ToolbarGroup>
        </Toolbar>


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
