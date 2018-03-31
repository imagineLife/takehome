const express = require('express');
const app = express();
const {PORT} = require('./config');

app.use(express.static('public'));

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});


app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});

module.exports = {app};