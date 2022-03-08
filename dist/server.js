"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _dbConn = _interopRequireDefault(require("./config/dbConn.mjs"));

var _Auth = _interopRequireDefault(require("./routes/Auth.mjs"));

var _blog = _interopRequireDefault(require("./routes/blog.mjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

(0, _dbConn.default)();
const app = (0, _express.default)();

_mongoose.default.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(3000, () => console.log("Server running on port 3000"));
}); // middleware


app.use(_express.default.json());
app.use("/api/blog", _Auth.default);
app.use("/api/blog", _blog.default);