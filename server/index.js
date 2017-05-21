const express = require('express');
const bodyParser = require('body-parser');
const swaggerize = require('swaggerize-express');
const swaggerSpec = require('../config/api.json');
const morgan = require('morgan');
const { Model } = require('objection');
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

Model.knex(knex);

const app = express();
app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

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

app.get('/hello', (req, res) => {
  res.send('hello world');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('app listening on', port);
});
