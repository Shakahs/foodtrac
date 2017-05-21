import { React, Component } from 'react';
import Geosuggest from 'react-geosuggest';


class SearchBar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>Search Bar

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
        });
      }}
    />

      </div>
    );
  }
}


export default SearchBar;
