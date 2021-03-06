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
    user_rewards: PropTypes.array,
    orders: PropTypes.array,
  }).isRequired,

  auth: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    isLoggingIn: PropTypes.bool,
    tokenData: PropTypes.object,
    profileData: PropTypes.object,
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
    updateUserRewards: PropTypes.func,
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
    menuitems: PropTypes.array,
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
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  event: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),

  sw: PropTypes.shape({
    swReg: PropTypes.object,
    subscription: PropTypes.object,
    vapidPubKey: PropTypes.object,
  }),
  swActions: PropTypes.shape({
    registeredServiceWorker: PropTypes.func,
    subscribePush: PropTypes.func,
    unsubscribePush: PropTypes.func,
  }),
  setValues: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  trigger: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
  flatRate: PropTypes.string.isRequired,
  percentRate: PropTypes.number.isRequired,
  defaultCouponId: PropTypes.number.isRequired,
  rewardTrigger: PropTypes.number.isRequired,
  saveChanges: PropTypes.func.isRequired,
  coupon: PropTypes.shape({
    flat_discount: PropTypes.number,
    percent_discount: PropTypes.number,
  }).isRequired,
  userRewards: PropTypes.arrayOf(PropTypes.shape({
    brand_id: PropTypes.number,
    user_id: PropTypes.number,
    count: PropTypes.number,
  })).isRequired,
  discount: PropTypes.number.isRequired,
  handleDiscount: PropTypes.func.isRequired,
  coupons: PropTypes.arrayOf(PropTypes.object).isRequired,

  rewards: PropTypes.arrayOf(PropTypes.object).isRequired,
  reward: PropTypes.shape({
    brands: PropTypes.shape({
      name: PropTypes.string,
      rewards_trigger: PropTypes.number,
    }),
    count: PropTypes.number,
  }).isRequired,
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.element,

  coverImage: PropTypes.shape({
    filename: PropTypes.string,
  }),
  logo: PropTypes.shape({
    filename: PropTypes.string,
  }),
  imageType: PropTypes.string.isRequired,

  close: PropTypes.func.isRequired,

  loading: PropTypes.bool.isRequired,
  loadingActions: PropTypes.shape({
    startLoading: PropTypes.func,
    endLoading: PropTypes.func,
  }).isRequired,

  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
