const Stock = require("../models/stockModel");

// Get all stocks
const getAllItems = async (req, res) => {
  try {
    const stocks = await Stock.find();
    if (!stocks.length) {
      return res.status(404).json({ message: "No stocks found" });
    }
    return res.status(200).json({ stocks });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new stock
const addItem = async (req, res) => {
  const {
    stockName,
    stockCode,
    quantity,
    price,
    stockDescription,
  } = req.body;

  try {
    // Check if stockCode already exists
    const existingStock = await Stock.findOne({ stockCode });
    if (existingStock) {
      return res
        .status(400)
        .json({ message: "Stock with this code already exists" });
    }

    const newStock = new Stock({
      stockName,
      stockCode,
      quantity,
      price,
      stockDescription,
    });

    await newStock.save();
    return res.status(201).json({ stock: newStock });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to add stock" });
  }
};

// Get stock by Stock Code
const getById = async (req, res) => {
  try {
    const stock = await Stock.findOne({ stockCode: req.params.itemCode });

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    return res.status(200).json({ stock });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update stock by Stock Code
const updateItem = async (req, res) => {
  try {
    const updatedStock = await Stock.findOneAndUpdate(
      { stockCode: req.params.itemCode },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    return res.status(200).json({ stock: updatedStock });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update stock" });
  }
};

// Delete stock by Stock Code
const deleteItem = async (req, res) => {
  try {
    const deletedStock = await Stock.findOneAndDelete({
      stockCode: req.params.itemCode,
    });

    if (!deletedStock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    return res.status(200).json({ message: "Stock deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Export controllers
module.exports = {
  getAllItems,
  addItem,
  getById,
  updateItem,
  deleteItem,
};