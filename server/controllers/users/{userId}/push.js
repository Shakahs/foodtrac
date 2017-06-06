const UserPushInfo = require('../../../db/userpushinfo.model');
const webpush = require('web-push');

webpush.setVapidDetails('mailto:test@gmail.com', process.env.VAPID_PUB, process.env.VAPID_PRIV);

module.exports = {
  post(req, res) {
    req.body.user_id = req.params.userId;
    const findUserPush = () => UserPushInfo.query().where('user_id', req.params.userId).first();
    findUserPush()
      .then((pushInfo) => {
        if (pushInfo) return findUserPush().patch(req.body).then(() => findUserPush());
        return UserPushInfo.query().insert(req.body);
      })
      .then(({ subscription }) => {
        webpush.sendNotification(JSON.parse(subscription), 'You\'ve subscribed to Foodtrac notifications!');
        res.sendStatus(200);
      });
  },
  delete(req, res) {
    UserPushInfo.query()
      .delete()
      .where('user_id', req.params.userId)
      .then(() => res.sendStatus(200))
      .catch(e => res.status(400).send(e.message));
  },
};
