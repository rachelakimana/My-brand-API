"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dbConn = _interopRequireDefault(require("./config/dbConn.mjs"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

(0, _dbConn.default)();
const app = (0, _express.default)();
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
app.get("/api/products", (req, res) => {
  res.json([{
    name: "iPhone",
    price: 800
  }, {
    name: "iPad",
    price: 650
  }, {
    name: "iWatch",
    price: 750
  }]);
});