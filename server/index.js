const express = require('express');
const bodyParser = require('body-parser');
const swaggerize = require('swaggerize-express');
const swaggerSpec = require('./api.json');
const morgan = require('morgan');
const { Model } = require('objection');
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

Model.knex(knex);

const app = express();
app.use('/static', express.static('static'));
app.use(bodyParser.json());

delete swaggerSpec.host;
app.use(swaggerize({
  api: swaggerSpec,
  handlers: './controllers',
}));

if (app.get('env') === 'production') {
  app.use(morgan('common', { skip(req, res) { return res.statusCode < 400; }, stream: `${__dirname}/../morgan.log` }));
} else {
  app.use(morgan('dev'));
}

// try to send custom error messages after API request validation failure instead of a strack trace
// per https://github.com/krakenjs/swaggerize-routes/issues/60
// app.use((err, req, res, next) => {
//   if (err && err.name === 'ValidationError') {
//     res.body = JSON.stringify('Invalid request');
//   }
//   next();
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('node listening on port', port);
});
