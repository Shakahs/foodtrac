const objection = require('objection');
const Images = require('../../../db/images/images.model');
const Brands = require('../../../db/brands.model');
const { saveFileToGoogleStorage } = require('../../../utils');


module.exports = {
  post(req, res) {
    const filename = saveFileToGoogleStorage(req.body.fileData);

    objection.transaction(Images.knex(), trx => Images.query(trx)
        .insert({
          filename,
          user_id: req.body.userId,
        })
      .then(newImage => Brands.query(trx)
        .patch({ logo_image_id: newImage.id })
        .where('id', req.params.brandId)))
      .then(() => res.status(201).send(`data received okay ${filename}`))
      .catch(e => res.status(400).send(e.message));
  },
};
