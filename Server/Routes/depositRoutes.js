const express = require("express");
const router = express.Router();
const depositController = require("../Controllers/depositController");

router.post("/", depositController.addDeposit);
router.get("/", depositController.getDeposits);
router.put("/:id", depositController.updateDeposit);
router.delete("/:id", depositController.deleteDeposit);
router.get("/:id", depositController.getDepositById);

module.exports = router;
