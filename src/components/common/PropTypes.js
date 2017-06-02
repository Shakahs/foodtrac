import PropTypes from 'prop-types';

export default {
  trucks: PropTypes.arrayOf(PropTypes.shape({
    brand_id: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    brands: PropTypes.object,
    locations: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      address: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
      food_genres: PropTypes.string,
    }),
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
    menu_items: PropTypes.array,
    locations: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      address: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
      food_genres: PropTypes.string,
    }),
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
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,

  brand: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,

  brandName: PropTypes.string.isRequired,
  brandId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  foodGenre: PropTypes.string.isRequired,

  foodGenresActions: PropTypes.shape({
    foodGenresRequest: PropTypes.func,
  }).isRequired,

  userActions: PropTypes.shape({
    brandInfoUpdate: PropTypes.func,
  }).isRequired,

  foodGenres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,

  changeItem: PropTypes.func.isRequired,
  removeMenuItem: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  menuItem: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    calorie: PropTypes.number,
    type: PropTypes.number,
  }).isRequired,

  menuItems: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,

  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    calories: PropTypes.number,
  }).isRequired,

  review: PropTypes.shape({
    created_at: PropTypes.string,
    title: PropTypes.string,
    user_id: PropTypes.string,
    score: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,

  getBrand: PropTypes.func,
  idx: PropTypes.number,
  submitComment: PropTypes.func,
  userId: PropTypes.number,
  removeComment: PropTypes.func,
  editComment: PropTypes.func,
  timeline_id: PropTypes.number,

  comments: PropTypes.arrayOf(PropTypes.shape({
    brand_id: PropTypes.number,
    created_at: PropTypes.string,
    id: PropTypes.number,
    text: PropTypes.string,
    updated_at: PropTypes.string,
    user_id: PropTypes.number,
    users: PropTypes.object,
  })),
  comment: PropTypes.shape({
    brand_id: PropTypes.number,
    created_at: PropTypes.string,
    id: PropTypes.number,
    text: PropTypes.string,
    updated_at: PropTypes.string,
    user_id: PropTypes.number,
    users: PropTypes.object,
  }),

  currentOrder: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,

  currentItem: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,

  addToOrder: PropTypes.func.isRequired,
  removeFromOrder: PropTypes.func.isRequired,

  order: PropTypes.shape({
    date: PropTypes.string,
    orderitems: PropTypes.array,
  }).isRequired,

  getOrders: PropTypes.func.isRequired,

  truckId: PropTypes.string.isRequired,
  is_truck_owner: PropTypes.bool.isRequired,

  upvotes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    brand_id: PropTypes.number,
    user_id: PropTypes.number,
  })).isRequired,
  mapUpvotes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    brand_id: PropTypes.number,
    user_id: PropTypes.number,
  })).isRequired,
  event: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),

};
