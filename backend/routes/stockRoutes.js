const express = require("express");
const router = express.Router();
const {
  getAllItems,
  addItem,
  getById,
  updateItem,
  deleteItem,
} = require("../controllers/stockConroller");

// Define Routes
router.get("/", getAllItems);
router.post("/", addItem);
router.get("/:itemCode", getById);
router.put("/:itemCode", updateItem);
router.delete("/:itemCode", deleteItem);

module.exports = router;
