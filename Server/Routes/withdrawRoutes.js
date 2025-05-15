const express = require("express");
const router = express.Router();
const withdrawController = require("../Controllers/withdrawController");

router.post("/", withdrawController.addWithdraw);
router.get("/", withdrawController.getWithdraws);
router.delete("/:id", withdrawController.deleteWithdraw);
router.put("/:id", withdrawController.updateWithdraw);
router.get("/:id", withdrawController.getWithdrawById);

module.exports = router;
