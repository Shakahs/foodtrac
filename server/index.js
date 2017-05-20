const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use('/static', express.static('static'));
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.end('hello world');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('app listening on', port);
});
