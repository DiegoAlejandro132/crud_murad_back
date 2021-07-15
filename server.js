const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Tentativa de crud passada pelo murad" });
});


// set port, listen for requests
require("./app/routes/cliente.routes")(app)
require("./app/routes/contato.routes")(app)
require("./app/routes/inquilino.routes")(app)
require("./app/routes/endereco.routes")(app)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

