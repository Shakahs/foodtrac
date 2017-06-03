const Brands = require('../db/brands.model');
const moment = require('moment');

module.exports = {
  get(req, res) {
    // queries: filter by time with ?time=[month | week | day]
    let timeFilter;
    const thisYear = moment().utc().year();
    if (req.query.time === 'day') req.query.time = 'dayOfYear';
    if (req.query.time) timeFilter = moment().utc()[req.query.time]();
    if (req.query.time === 'month') timeFilter++;

    Brands.knex()
      .select('*').from('Brands')
      .join('Upvotes', function brandUpvoteJoin() {
        this.on('Brands.id', '=', 'Upvotes.brand_id');
      })
      .groupBy('Upvotes.brand_id')
      .select(Brands.raw('Brands.*, count(Upvotes.id) as upvoteCount'))
      .whereRaw(timeFilter ? `${req.query.time}(Upvotes.date) = ${timeFilter}` : true)
      .andWhereRaw(timeFilter ? `year(Upvotes.date) = ${thisYear}` : true)
      .orderByRaw('upvoteCount desc')
      .then(result => res.send(result));
  },
  post(req, res) {
    Brands.query()
      .insertGraph(req.body)
      .then(newBrand => res.status(201).send(newBrand))
      .catch(e => res.status(400).send(e.message));
  },
};
