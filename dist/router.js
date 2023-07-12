"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var middleware_1 = require("./modules/middleware");
var product_1 = require("./handlers/product");
var update_1 = require("./handlers/update");
var router = (0, express_1["default"])();
//Product
router.get("/product", product_1.getProducts, function (req, res) { });
router.get("/product/:id", product_1.getOneProduct, function (req, res) { });
router.post("/product", (0, express_validator_1.body)("name").isString(), middleware_1.handleInputErrors, product_1.createProdct, function (req, res) { });
router.put("/product/:id", (0, express_validator_1.body)("name").isString(), middleware_1.handleInputErrors, product_1.updateProduct, function (req, res) { });
router["delete"]("/product/:id", product_1.deleteProdct, function (req, res) { });
// Update
router.get("/update", update_1.getUpdates, function () { });
router.get("/update/:id", update_1.getOneUpdates, function () { });
router.post("/update", (0, express_validator_1.body)("title").exists().isString(), (0, express_validator_1.body)("body").exists().isString(), (0, express_validator_1.body)("productId").exists().isString(), middleware_1.handleInputErrors, update_1.createUpdate, function () { });
router.put("/update/:id", (0, express_validator_1.body)("title").optional(), (0, express_validator_1.body)("body").optional(), (0, express_validator_1.body)("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECIATED"]), (0, express_validator_1.body)("version").optional(), middleware_1.handleInputErrors, update_1.updateUpdate, function () { });
router["delete"]("/update/:id", update_1.deleteUpdate, function () { });
// UpdatePoint
router.get("/updatepoint", function () { });
router.get("/updatepoint/:id", function () { });
router.post("/updatepoint", (0, express_validator_1.body)("name").exists().isString(), (0, express_validator_1.body)("description").exists().isString(), function () { });
router.put("/updatepoint/:id", (0, express_validator_1.body)("name").optional().isString(), (0, express_validator_1.body)("description").optional().isString(), function () { });
router["delete"]("/updatepoint/:id", function () { });
router.use(function (err, req, res, next) {
    console.log(err);
    res.json({ message: "in router handler" });
});
exports["default"] = router;
//# sourceMappingURL=router.js.map