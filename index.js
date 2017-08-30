/**
 * Created by pusti on 20.08.2017.
 */
const express = require('express');
const apiRoutes = express.Router();
const app = express();
const config = require('./config');
const permissions = require('./permissions.json');

app.set('secret', config.secret);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

require('./routes.js')(app,apiRoutes);

const port = process.env.PORT || 8080;


app.listen(port, () => {
    console.log('server running on port ' + port);
});