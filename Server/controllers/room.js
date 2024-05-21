const Mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const User = require("../models/User");
const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

const checkStatus = (startDate) => {
  const today = new Date();
  const date = new Date(startDate);
  if (date.getFullYear() > today.getFullYear()) {
    return "Booked";
  } else {
    if (date.getMonth() > today.getMonth()) {
      return "Booked";
    } else {
      if (date.getDate() > today.getDate()) {
        return "Booked";
      } else if (date.getDate() === today.getDate()) {
        return "Checkin";
      }
    }
  }
};

// cập nhật tình trạng đặt phòng
const updateRoomNumbersDate = (roomNumbersIdList, dates) => {
  roomNumbersIdList.forEach(async (id) => {
    await Room.updateOne(
      { "roomNumbers._id": id },
      {
        $push: {
          "roomNumbers.$.unAvailableDates": dates,
        },
      }
    );
  });
};

const formatRoomList = async (roomIdList) => {
  let roomNumbers = await Promise.all(
    roomIdList.map((room) => {
      const data = Room.findOne({ "roomNumbers._id": room }, ["roomNumbers"]);
      return data;
    })
  );

  let arr = [];
  let isExist = (roomNumbers, id) => {
    for (let i = 0; i < roomNumbers.length; i++) {
      if (roomNumbers[i]._id.toString() === id.toString()) return true;
    }
    return false;
  };
  roomNumbers.forEach((item) => {
    if (!isExist(arr, item._id)) {
      arr.push(item);
    }
  });

  const eachRNumber = [];
  arr.forEach((room) => {
    room.roomNumbers.forEach((number) => {
      eachRNumber.push({ _id: room._id, roomNumber: number });
    });
  });

  let result = [];
  roomIdList.forEach((room) => {
    eachRNumber.forEach((item) => {
      if (item.roomNumber._id.toString() === room.toString()) {
        result.push(item);
      }
    });
  });

  result = result.map((item) => {
    return {
      roomId: item._id,
      roomNumber: {
        _id: item.roomNumber._id,
        number: item.roomNumber.number,
      },
    };
  });
  return result;
};

// Đặt phòng
exports.reserve = async (req, res) => {
  const { user, hotel, rooms, dates, price, payment } = req.body;
  updateRoomNumbersDate(rooms, dates);
  const bookedRooms = await formatRoomList(rooms);
  const hotelName = await Hotel.findById(hotel).select("name");

  await User.findOneAndUpdate(
    { email: user.email },
    {
      fullName: user.name,
      phoneNumber: user.phone,
      identity: user.identity,
    }
  );

  const transaction = new Transaction({
    user: user,
    hotel: new Mongoose.Types.ObjectId(hotel),
    hotelName: hotelName.name,
    rooms: bookedRooms,
    dateStart: dates[0],
    dateEnd: dates[dates.length - 1],
    price: price,
    payment: payment,
    status: checkStatus(dates[0]),
  });
  transaction.save();
  res.end();
};

// (Admin) Hiển thị danh sách tất cả phòng
exports.getAllRoom = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
  } catch (error) {
    console.log("Error:", error);
  }
};

// (Admin) Thêm phòng
exports.addNewRoom = async (req, res) => {
  const data = req.body;
  const roomNumbers = data.rooms.map((item) => {
    return {
      number: item,
      unAvailableDates: [],
      _id: item._id || new Mongoose.Types.ObjectId(),
    };
  });
  let id = new Mongoose.Types.ObjectId();
  id = id.toString();

  const newRoom = new Room({
    _id: id,
    desc: data.description,
    maxPeople: data.maxPeople,
    price: data.price,
    roomNumbers: roomNumbers,
    title: data.title,
  });

  newRoom.save();
  await Hotel.findByIdAndUpdate(data.hotel, {
    $push: { rooms: id },
  });
  res.end();
};

// (Admin) Xoá phòng
exports.deleteRoom = async (req, res) => {
  const reqData = req.body;
  const tranList = await Transaction.find().select("rooms");
  let roomIdList = [];
  tranList.forEach((tran) => {
    tran.rooms.forEach((item) => {
      roomIdList.push({ _id: tran._id, roomId: item.roomId });
    });
  });

  const foundRoomId = roomIdList.find(
    (item) => item.roomId.toString() === reqData.id
  );
  if (foundRoomId) {
    res.status(200).send("booking");
  } else {
    await Room.findByIdAndDelete(reqData.id);
    await Hotel.updateMany(
      {},
      {
        $pull: { rooms: reqData.id },
      }
    );
    res.end();
  }
};

exports.getRoom = async (req, res, next) => {
  const id = req.params.id;
  try {
    const room = await Room.findById(new Mongoose.Types.ObjectId(id));
    res.send(room);
  } catch (err) {
    console.log("Error:", err);
  }
};

// (Admin) Chỉnh sửa thông tin phòng
exports.editRoom = async (req, res, next) => {
  const roomId = req.params.id;
  const data = req.body;
  const roomNumbers = data.rooms.map((item) => {
    return {
      number: item,
      unAvailableDates: [],
      _id: item._id || new Mongoose.Types.ObjectId(),
    };
  });
  try {
    const updated = await Room.findByIdAndUpdate(roomId, {
      desc: data.description,
      maxPeople: data.maxPeople,
      price: data.price,
      roomNumbers: roomNumbers,
      title: data.title,
    });
    res.status(200).end();
  } catch (err) {
    next(err);
  }
};
