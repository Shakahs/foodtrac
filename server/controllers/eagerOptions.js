module.exports = {
  userEagerOptions: '[brands.[events_attending.events, logo_image], user_follows.[upvotes, food_genres, trucks.[locations(latest)], logo_image], events, events_attending.[events.[locations, owners, users_attending.users, brands_attending.brands]], user_rewards.[user_coupons.coupons, brands], orders.menuitems.brands]',
};
