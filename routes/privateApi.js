const express = require("express");
const router = express.Router();
const token = require("../controllers/tokens"); // token authentication middleware
const prodController = require("../controllers/product.controller");
const prodValidator = require("../controllers/product.validator");

router.get("/", (req, res) => {
    res.send("This is private API");
});

router.get("/products", token.authenticateToken, prodController.sendProduct);
router.put("/products/:id", token.authenticateToken,
                            prodValidator.validateProductName,
                            prodController.productExists,
                            prodController.changeProduct);

router.delete("/products/:id", token.authenticateToken,
                                prodController.productExists,
                                prodController.removeProduct);

module.exports = router;