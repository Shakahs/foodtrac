const UserRewards = require('../db/userrewards.model');

module.exports = {
  post(req, res) {
    UserRewards.query()
      .where('user_id', '=', req.body.user_id)
      .andWhere('brand_id', '=', req.body.brand_id)
      .then((reward) => {
        if (reward.length > 0) {
          return UserRewards.query()
            .where('user_id', '=', req.body.user_id)
            .andWhere('brand_id', '=', req.body.brand_id)
            .patch(req.body)
            .then(() => res.sendStatus(200));
        } else { // eslint-disable-line no-else-return
          return UserRewards.query()
            .insert(req.body)
            .then(() => res.sendStatus(201));
        }
      })
      .catch(() => res.sendStatus(400));
  },
};
