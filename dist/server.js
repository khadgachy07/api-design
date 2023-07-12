"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = require("./modules/auth");
var user_1 = require("./handlers/user");
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use((0, morgan_1["default"])('dev'));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
/**
* Route to greet the user.
*/
app.get('/', function (req, res, next) {
    try {
        res.status(200).send({ message: 'hello' });
    }
    catch (err) {
        next(err);
    }
});
/**
* Route to handle user authentication.
*/
app.use('/api', auth_1.protect, router_1["default"]);
/**
* Route to create a new user.
*/
app.post('/user', user_1.createUser);
/**
* Route to sign in a user.
*/
app.post('/signin', user_1.signinUser);
/**
* Error handling middleware.
*/
app.use(function (err, req, res, next) {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'Unauthorized' });
    }
    else if (err.type === 'input') {
        res.status(400).json({ message: 'Invalid Input' });
    }
    else {
        res.status(500).json({ message: 'Unexpected error' });
    }
});
exports["default"] = app;
//# sourceMappingURL=server.js.map