const express = require("express");
const router = express.Router();

const roomController = require("../controllers/room");

router.post("/reserve", roomController.reserve);
router.get("/get-room/:id", roomController.getRoom);

router.get("/get-all-room", roomController.getAllRoom);
router.post("/add-new-room", roomController.addNewRoom);
router.post("/delete-room", roomController.deleteRoom);
router.post("/edit-room/:id", roomController.editRoom);

exports.route = router;
