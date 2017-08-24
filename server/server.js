require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// initialize routes
app.use('/v0', require('./versions/version0/routes/root'));



app.get('/', (req, res) => {
  res.send('Breadcrumbs API');
});





app.listen(port, () => {
  console.log(`Started app on port ${port}`);
});

module.exports = {app}
