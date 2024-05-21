const Mongoose = require("mongoose");
const Hotel = require("../models/Hotel");
const Transaction = require("../models/Transaction");
const Room = require("../models/Room");
const User = require("../models/User");

// Hàm lọc khách sạn theo thành phố
const filterHotelByCity = (hotels) => {
  const result = [
    {
      cityName: "Ha Noi",
      imageUrl: "./images/Ha Noi.jpg",
      quantity: 0,
    },
    {
      cityName: "Ho Chi Minh",
      imageUrl: "./images/HCM.jpg",
      quantity: 0,
    },
    {
      cityName: "Da Nang",
      imageUrl: "./images/Da Nang.jpg",
      quantity: 0,
    },
  ];

  hotels.forEach((hotel) => {
    const cityName = hotel.city;
    const index = result.findIndex((item) => item.cityName === cityName);
    if (index > -1) {
      result[index].quantity++;
    }
  });
  return result;
};

// Hàm lọc khách sạn theo loại
const filterHotelByType = (hotels) => {
  const result = [
    {
      type: "hotel",
      imageUrl: "./images/type_1.webp",
      quantity: 0,
    },
    {
      type: "apartment",
      imageUrl: "./images/type_2.jpg",
      quantity: 0,
    },
    {
      type: "resort",
      imageUrl: "./images/type_3.jpg",
      quantity: 0,
    },
    {
      type: "villa",
      imageUrl: "./images/type_4.jpg",
      quantity: 0,
    },
    {
      type: "cabin",
      imageUrl: "./images/type_5.jpg",
      quantity: 0,
    },
  ];
  hotels.forEach((hotel) => {
    const type = hotel.type;
    const index = result.findIndex((item) => item.type === type);
    if (index > -1) {
      result[index].quantity++;
    }
  });
  return result;
};

// Hàm lấy 3 khách sạn rating cao nhất
const filterHotelByRating = (hotels) => {
  const array = hotels.sort((a, b) => b.rating - a.rating);
  const result = array.slice(0, 3);
  return result;
};

// Hiển thị thông tin HomePage
exports.getHotels = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      if (hotels.length > 0) {
        const hotelByCity = filterHotelByCity(hotels);
        const hotelByType = filterHotelByType(hotels);
        const hotelByRating = filterHotelByRating(hotels);
        res.send({
          hotelByCity: hotelByCity,
          hotelByType: hotelByType,
          hotelByRating: hotelByRating,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => console.log("Error:", err));
};

exports.getHotelById = (req, res, next) => {
  const id = req.params.id;
  Hotel.findById(new Mongoose.Types.ObjectId(id))
    .then((hotel) => {
      if (hotel) {
        res.send(hotel);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => console.log("Error:", err));
};

exports.getRoomOfHotel = async (req, res, next) => {
  const hotelId = req.params.id;
  const hotel = await Hotel.findById(hotelId);
  const rooms = await Promise.all(
    hotel.rooms.map((room) => {
      const roomDetail = Room.findById(room);
      return roomDetail;
    })
  );
  if (rooms.length > 0) {
    res.send(rooms);
  } else {
    res.status(404).end();
  }
};

// Hàm tính tổng doanh thu
const calEarning = async () => {
  try {
    const priceList = await Transaction.find().select("price");
    const earning = priceList.reduce((total, currentValue) => ({
      price: total.price + currentValue.price,
    }));
    return earning.price;
  } catch (err) {
    console.log("Error:", err);
  }
};

// Hàm tính doanh thu trung bình
const calBalance = async (totalPrice) => {
  const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  try {
    const monthList = await Transaction.find().select("dateStart -_id");
    months.forEach((month, i) => {
      monthList.forEach((date) => {
        if (date.dateStart.getMonth() + 1 === i + 1) {
          months[i]++;
        }
      });
    });

    const sum = [...months].reduce(
      (total, x) => (x != 0 ? total + 1 : total),
      0
    );
    return totalPrice / sum;
  } catch (err) {
    console.log("Error:", err);
  }
};

// Hiển thị thông tin ở Dashboarh
exports.getDashboard = async (req, res) => {
  const earning = await calEarning();
  const balance = await calBalance(earning);
  const result = {
    users: await User.count({ isAdmin: false }),
    orders: await Transaction.count(),
    earning: earning,
    balance: balance,
  };
  res.send(result);
};

// (Admin) Hiển thị thông tin tất cả khách sạn
exports.getAllHotel = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.send(hotels);
  } catch (err) {
    console.log("Error:", err);
  }
};

// (Admin) Thêm khách sạn
exports.addNewHotel = async (req, res) => {
  const data = req.body;
  const newHotel = new Hotel({
    address: data.address,
    cheapestPrice: data.price,
    city: data.city,
    desc: data.description,
    distance: data.distance,
    featured: data.featured,
    name: data.name,
    photos: data.images,
    rooms: data.rooms,
    title: data.title,
    type: data.type,
    rating: 5,
  });
  newHotel.save();
  res.status(200).end();
};

// (Admin) Xoá khách sạn
exports.deleteHotel = async (req, res) => {
  const hotelId = req.body.id;
  const foundTran = await Transaction.find({ hotel: hotelId }).select("status");
  if (foundTran.length === 0) {
    await Hotel.findByIdAndDelete(hotelId);
    res.end();
  } else {
    res.status(200).send("booking");
  }
};

// Tìm kiếm khách sạn theo các tiêu chí
exports.searchHotel = async (req, res) => {
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const city = req.body.destination;
  const startDate = req.body.date.startDate;
  const endDate = req.body.date.endDate;
  const room = req.body.options.room;
  const maxPeople = req.body.options.adult + req.body.options.children;
  const startDates = new Date(startDate);
  const endDates = new Date(endDate);

  const allDates = getDatesInRange(startDates, endDates);

  try {
    const roomAvailable = [];
    const rooms = await Room.find({
      maxPeople: { $gte: Number(maxPeople) },
    });
    rooms.map((room) => {
      room.roomNumbers.map((item) => {
        const checkRooms = item.unAvailableDates.some((date) =>
          allDates.includes(new Date(date).getTime())
        );
        if (!checkRooms) {
          roomAvailable.push(room);
        }
      });
    });

    const roomId = roomAvailable.map((room) => room._id.toString());

    const hotels = await Hotel.find({
      city: city,
      rooms: { $in: roomId },
    });

    const listHotels = hotels.filter(
      (hotel) => hotel.rooms.length >= Number(room)
    );
    res.status(200).json(listHotels);
  } catch (err) {
    console.log(err);
  }
};

// (Admin) Chỉnh sửa thông tin khách sạn
exports.editHotel = async (req, res, next) => {
  const hotelId = req.params.id;
  const data = req.body;
  try {
    const updated = await Hotel.findByIdAndUpdate(hotelId, {
      address: data.address,
      cheapestPrice: data.price,
      city: data.city,
      desc: data.description,
      distance: data.distance,
      featured: data.featured,
      name: data.name,
      photos: data.images,
      rooms: data.rooms,
      title: data.title,
      type: data.type,
    });
    res.status(200).end();
  } catch (err) {
    next(err);
  }
};
