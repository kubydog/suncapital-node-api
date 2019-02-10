require("rootpath");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require('./jwt');
const errorHandler = require('./util/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

app.use('/user', require('./user/user.controller'));
app.use(errorHandler);

const port = 4000;
const server = app.listen(port, function(){
    console.log("Server listening on port " + port);
})
