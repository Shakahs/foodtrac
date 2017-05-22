import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import { Redirect } from 'react-router-dom';


class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/map" />;
    }
    return (
      <div className="searchBar">
        <Geosuggest
          className="midin"
          country="us"
          types={['geocode']}
          placeholder="Type your address!"
          onSuggestSelect={(loc) => {
            this.setState({
              address: loc.label,
              lat: loc.location.lat,
              lng: loc.location.lng,
              redirect: !this.state.redirect,
            });
          }}
        />
      </div>
    );
  }
}


export default SearchBar;
