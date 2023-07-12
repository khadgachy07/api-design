import Router from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProdct,
  deleteProdct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import { createUpdate, deleteUpdate, getOneUpdates, getUpdates, updateUpdate } from "./handlers/update";

const router = Router();

//Product

router.get("/product", getProducts, (req, res) => {});

router.get("/product/:id", getOneProduct, (req, res) => {});

router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProdct,
  (req, res) => {}
);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct,
  (req, res) => {}
);

router.delete("/product/:id", deleteProdct, (req, res) => {});

// Update

router.get("/update", getUpdates,() => {});
router.get("/update/:id", getOneUpdates,() => {});
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  handleInputErrors,
  createUpdate,
  () => {}
);

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECIATED"]),
  body("version").optional(),
  handleInputErrors,
  updateUpdate,
  () => {}
);

router.delete("/update/:id", deleteUpdate,() => {});

// UpdatePoint

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").exists().isString(),
  () => {}
);

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);

router.delete("/updatepoint/:id", () => {});

router.use((err,req,res,next) => {
  console.log(err)
  res.json({message: "in router handler"})
})

export default router;
