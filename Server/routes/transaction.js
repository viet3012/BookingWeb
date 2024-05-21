const express = require("express");
const router = express.Router();

const tranController = require("../controllers/transaction");

router.post("/get-transaction-by-user", tranController.getTransactionByUser);

router.get("/get-latest-transaction", tranController.getLatestTransaction);
router.get("/get-all-transaction", tranController.getAllTransaction);

exports.route = router;
