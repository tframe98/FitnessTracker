const express = require('express');
const app = express();

app.get('/', () => {

});

app.use('/api/v1', require('./api/index.js'));

app.listen(3000, () => console.log(`listening on port 3000`));