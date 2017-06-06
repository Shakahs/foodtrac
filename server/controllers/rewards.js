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
            .then(() => res.sendStatus(200))
            .catch(err => console.log(err));
        } else { // eslint-disable-line no-else-return
          return UserRewards.query()
            .insert(req.body)
            .then(newReward => res.status(201).send(newReward));
        }
      })
      .catch(e => res.status(400).send(e.message));
  },
};
