const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 3001;
let db = require("./models");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//cors
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     optionSuccessStatus: 200,
//     credentials: true
//   })
// );

app.use(routes);

db.sequelize.sync().then(function() {
  console.log("started!!!");

  http.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
});
