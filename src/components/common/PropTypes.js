import PropTypes from 'prop-types';

export default {
  trucks: PropTypes.arrayOf(PropTypes.shape({
    brand_id: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    brands: PropTypes.object,
    locations: PropTypes.array,
  })).isRequired,

  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    is_truck_owner: PropTypes.bool,
    auth0_id: PropTypes.string,
  }).isRequired,

  handleChange: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
  val: PropTypes.string.isRequired,

  truck: PropTypes.shape({
    brand_id: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    brands: PropTypes.object,
    locations: PropTypes.array,
  }).isRequired,

  markers: PropTypes.arrayOf(PropTypes.shape({
    position: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
    key: PropTypes.number,
    defaultAnimation: PropTypes.number,
  })).isRequired,

  handleSubmit: PropTypes.func.isRequired,
  authActions: PropTypes.shape({ logout: PropTypes.func, loginRequest: PropTypes.func }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,

  actions: PropTypes.shape({
    mapRequest: PropTypes.func,
  }).isRequired,

  handleLogout: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      brandId: PropTypes.string,
    }),
  }).isRequired,

  brandName: PropTypes.string.isRequired,

  foodGenresActions: PropTypes.shape({
    foodGenresRequest: PropTypes.func,
  }).isRequired,

  foodGenres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  brandId: PropTypes.string.isRequired,

};
