const Transaction = require("../models/Transaction");

// Hàm so sánh ngày
const compareDate = (dateA, dateB) => {
  if (dateA.getFullYear() > dateB.getFullYear()) {
    return "later";
  } else if (dateA.getFullYear() < dateB.getFullYear()) {
    return "earlier";
  } else {
    if (dateA.getMonth() > dateB.getMonth()) {
      return "later";
    } else if (dateA.getMonth() < dateB.getMonth()) {
      return "earlier";
    } else {
      if (dateA.getDate() > dateB.getDate()) {
        return "later";
      } else if (dateA.getDate() < dateB.getDate()) {
        return "earlier";
      } else {
        return "same";
      }
    }
  }
};

// Hàm cập nhật trạng thái transaction
const updateTransactionStatus = () => {
  const toDay = new Date();
  Transaction.find()
    .then((trans) => {
      trans.forEach((tran) => {
        const compareDateStart = compareDate(toDay, tran.dateStart);
        const compareDateEnd = compareDate(toDay, tran.dateEnd);
        if (compareDateStart === "earlier") {
          Transaction.findByIdAndUpdate(tran._id, { status: "Booked" }).then(
            (result) => {}
          );
        } else if (compareDateEnd === "later") {
          Transaction.findByIdAndUpdate(tran._id, { status: "Checkout" }).then(
            (result) => {}
          );
        } else {
          Transaction.findByIdAndUpdate(tran._id, { status: "Checkin" }).then(
            (result) => {}
          );
        }
      });
    })
    .catch((err) => console.log("Error:", err));
};

// Lấy thông tin transaction theo người dùng
exports.getTransactionByUser = async (req, res) => {
  const email = req.body.email;
  updateTransactionStatus();
  try {
    const transactions = await Transaction.find({ "user.email": email });
    if (transactions.length > 0) {
      res.send(transactions);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log("Error:", err);
  }
};

// (Admin) Hiển thị tất cả giao dịch
exports.getAllTransaction = async (req, res) => {
  try {
    const tranList = await Transaction.find();
    res.send(tranList);
  } catch (err) {
    console.log("Error:", err);
  }
};

// (Admin) Hiển thị 8 giao dịch gần nhất
exports.getLatestTransaction = async (req, res) => {
  try {
    const latestList = await Transaction.find().sort({ $natural: -1 }).limit(8);
    if (latestList.length > 0) {
      res.send(latestList);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log("Error:", err);
  }
};
