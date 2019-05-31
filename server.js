const express = require("express");
const orm = require("./config/orm.js");

const PORT = process.env.PORT || 3000;

let app = express();

app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const routes = require('./controllers/burgers_controller.js')

app.use(routes);

app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
});