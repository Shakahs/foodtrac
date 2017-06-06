const webpush = require('web-push');
const Comments = require('../db/comments.model');

webpush.setVapidDetails('mailto:test@gmail.com', process.env.VAPID_PUB, process.env.VAPID_PRIV);

module.exports = {
  post(req, res) {
    let message;
    let pushInfo;
    let newComment;
    const eagerOption = ('brand_id' in req.body)
      ? '[users, brands.[owners.[user_push_info(first)]]]'
      : '[users, events.[owners.[user_push_info(first)]]]';
    Comments.query()
      .insert(req.body)
      .eager(eagerOption, {
        first: builder => builder.first(),
      })
      .then((comment) => {
        newComment = comment;
        if ('brands' in comment) {
          message = `${comment.brands.name} received a new comment!`;
          pushInfo = comment.brands.owners.user_push_info;
          delete newComment.brands;
        } else {
          message = `Your ${comment.events.name} event received a new comment!`;
          pushInfo = comment.events.owners.user_push_info;
          delete newComment.events;
        }
        if (pushInfo) {
          return webpush.sendNotification(JSON.parse(pushInfo.subscription), message);
        }
        return null;
      })
      .then(() => res.status(201).send(newComment))
      .catch(e => res.status(400).send(e.message));
  },
};
