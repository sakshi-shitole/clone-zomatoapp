"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _route = _interopRequireDefault(require("./config/route.config"));
var _connection = _interopRequireDefault(require("./database/connection"));
var _auth = _interopRequireDefault(require("./api/auth"));
var _food = _interopRequireDefault(require("./api/food"));
var _restaurant = _interopRequireDefault(require("./api/restaurant"));
var _user = _interopRequireDefault(require("./api/user"));
var _menu = _interopRequireDefault(require("./api/menu"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//Private route authorization config

//Database connection

_dotenv.default.config();
(0, _route.default)(_passport.default);
const zomato = (0, _express.default)();

// Adding aditional passport configuration 
zomato.use(_express.default.json());
zomato.use((0, _expressSession.default)({
  secret: process.env.JWTSECRET
}));
zomato.use(_passport.default.initialize());
zomato.use(_passport.default.session());
zomato.get('/', (req, res) => {
  res.json({
    message: "Server is runnimg"
  });
});

// /auth/signup
zomato.use("/auth", _auth.default);
zomato.use("/food", _food.default);
zomato.use("/restaurant", _restaurant.default);
zomato.use("/user", _user.default);
zomato.use("/menu", _menu.default);
const PORT = 4000;
zomato.listen(PORT, () => {
  (0, _connection.default)().then(() => {
    console.log(" Server is running !!!");
  }).catch(error => {
    console.log("Server is running, but database connection failed...");
    console.log(error);
  });
});