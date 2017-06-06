const webpush = require('web-push');
const BrandReviews = require('../../server/db/brandreviews.model');

webpush.setVapidDetails('mailto:test@gmail.com', process.env.VAPID_PUB, process.env.VAPID_PRIV);

module.exports = {
  post(req, res) {
    let newReview;
    BrandReviews.query()
      .insert(req.body)
      .eager('brands.[owners.[user_push_info(first)]]', {
        first: builder => builder.first(),
      })
      .then((review) => {
        newReview = review;
        const pushInfo = review.brands.owners.user_push_info;
        const message = `${review.brands.name} has received a new review!`;
        if (pushInfo) {
          return webpush.sendNotification(JSON.parse(pushInfo.subscription), message);
        }
        return null;
      })
      .then(() => res.status(201).send(newReview))
      .catch(e => res.status(400).send(e.message));
  },
};
