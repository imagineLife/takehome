const express = require('express');
const app = express();
const {PORT} = require('./config');

app.use(express.static('public'));

app.get("/water", (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});


app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app};