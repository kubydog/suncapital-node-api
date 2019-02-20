require("rootpath");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require('./config/jwt');
const errorHandler = require('./util/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

app.use('/user', require('./controller/user.controller'));
app.use('/client', require('./controller/client.controller'));
app.use( '/account', require('./controller/account.controller'));
app.use(errorHandler);

const port = 4000;
const server = app.listen(port, function(){
    console.log("Server listening on port " + port);
})
