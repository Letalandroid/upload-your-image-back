const index = require("./app");

// Routes
const port = process.env.PORT || 3000;
index.listen(port, () => console.log(`Listening on port ${port}`));