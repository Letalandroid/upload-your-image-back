let index = require("./app");

// Routes
let port = process.env.PORT || 3000;
index.listen(port, function () { return console.log("Listening on port ".concat(port)); });