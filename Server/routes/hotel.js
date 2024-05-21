const express = require("express");
const router = express.Router();

const hotelController = require("../controllers/hotel");

router.post("/search-hotels", hotelController.searchHotel);
router.get("/get-hotels", hotelController.getHotels);
router.get("/get-hotel/:id", hotelController.getHotelById);
router.get("/get-rooms-of-hotel/:id", hotelController.getRoomOfHotel);

router.get("/get-dashboard", hotelController.getDashboard);
router.get("/get-all-hotel", hotelController.getAllHotel);
router.post("/add-new-hotel", hotelController.addNewHotel);
router.post("/delete-hotel", hotelController.deleteHotel);
router.post("/edit-hotel/:id", hotelController.editHotel);

exports.route = router;
