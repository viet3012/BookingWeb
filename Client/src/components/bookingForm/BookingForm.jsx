import React from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";

import "./bookingForm.css";

const BookingForm = (props) => {
  const phoneRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const identityRef = useRef();
  const paymentRef = useRef();
  const idhotel = useParams();
  console.log(idhotel);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [datesInRange, setDatesInRange] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [roomsOfHotel, setRoomsOfHotel] = useState([]);
  const [isDateValid, setDateValid] = useState(true);
  let [totalPrice, setTotalPrice] = useState(0);
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post("/find-user-by-email", { email: currentUser.email })
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const startDate = date[0].startDate;
    const endDate = date[0].endDate;
    const getRoomsOfHotel = async () => {
      const result = await axios.get("/get-rooms-of-hotel/" + idhotel.id);
      setRoomsOfHotel(result.data);
    };

    const getDatesInRange = () => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const date = new Date(start.getTime());

      const dates = [];

      while (date <= end) {
        dates.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1);
      }

      setDatesInRange(dates);
    };
    if (endDate.getTime() != startDate.getTime()) {
      getRoomsOfHotel();
      getDatesInRange();
    }
  }, [date]);
  const handleInputChange = (event) => {
    const target = handleEvent(event);
    setUserInfo({ ...userInfo, [target.name]: target.value });
  };
  const handleEvent = (event) => {
    const target = event.target;
    if (target.type === "checkbox") {
      return {
        value: target.value,
        checked: target.checked,
      };
    } else {
      return {
        name: target.name,
        value: target.value,
      };
    }
  };

  const calTotalPrice = (price, isBookingMore) => {
    const bookingDays = datesInRange.length;
    if (isBookingMore) {
      totalPrice += price * bookingDays;
    } else {
      totalPrice -= price * bookingDays;
    }
    setTotalPrice(totalPrice);
  };

  const isAvailable = (room) => {
    const isFound = room.unAvailableDates.some((date) =>
      datesInRange.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  // Add picking room to list and calculate total bill
  const handleRoomPicking = (event, price) => {
    const { value, checked } = handleEvent(event);
    setBookedRooms(
      checked
        ? [...bookedRooms, value]
        : bookedRooms.filter((item) => item !== value)
    );
    calTotalPrice(price, checked);
  };

  const renderRoomItem = (room, index) => {
    return (
      <div key={index} className="selectRoom__typeList--item">
        <div className="selectRoom__typeList--wrapper">
          <section className="selectRoom__typeList--detail">
            <h6>
              <b>{room.title}</b>
            </h6>
            <span className="selectRoom__typeList--desc">{room.desc}</span>
            <div className="selectRoom__typeList--bottom">
              <span>
                <b> Max people: {room.maxPeople}</b>
              </span>
              <b>${room.price}</b>
            </div>
          </section>
          {/* Room checkboxs */}
          <section className="selectRoom__typeList--rooms">
            {room.roomNumbers.map((item, i) => (
              <form key={i} className="selectRoom__typeList--checkbox">
                <label htmlFor="">{item.number}</label>
                <input
                  name={item.number}
                  type="checkbox"
                  value={item._id}
                  onChange={(event) => handleRoomPicking(event, room.price)}
                  disabled={!isAvailable(item)}
                />
              </form>
            ))}
          </section>
          {/* Room checkboxs */}
        </div>
      </div>
    );
  };

  const renderAvailableRooms = (roomList) => {
    return (
      <div className="selectRoom__typeList">
        {roomList.map((room, index) => renderRoomItem(room, index))}
      </div>
    );
  };

  const handleDateChange = (item) => {
    setDate([item.selection]);
    const { startDate, endDate } = date[0];
    if (startDate.getUTCDate() !== endDate.getUTCDate()) {
      setDateValid(false);
    } else {
      setDateValid(true);
    }
  };

  const handleReserve = async (event) => {
    event.preventDefault();
    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      identity: identityRef.current.value,
      payment: paymentRef.current.value,
    };
    // Kiểm tra các điều kiện
    if (user.name === "" || user.phone === "" || user.identity === "") {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (user.payment === "Select") {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    const reserveData = {
      user: user,
      hotel: props.hotel._id,
      rooms: bookedRooms,
      dates: datesInRange,
      price: totalPrice,
      payment: user.payment,
    };
    await axios.post("/reserve", reserveData);
    navigate("/dashboard");
  };

  return (
    <form className="bookingContainer" onSubmit={handleReserve}>
      {/* INPUT FORM INFO */}
      <section className="bookingInfo">
        {/* Date picking calendar */}
        <section className="datePick">
          <div className="datePick__wrapper">
            <h4 className="bookingInfo__title">
              <strong>Dates</strong>
            </h4>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => handleDateChange(item)}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="date datePick__calendar"
              minDate={new Date()}
            />
          </div>
        </section>
        {/* Date picking calendar */}
        {/* User info form */}
        <section className="userInfo">
          <h4 className="bookingInfo__title">
            <strong>Reserve Info</strong>
          </h4>
          <div className="userInfo_form">
            <form className="userInfo_form--item">
              <label>Your Full Name:</label>
              <div className="userInfo_form--input">
                <input
                  value={userInfo.fullName}
                  onChange={handleInputChange}
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  ref={nameRef}
                />
              </div>
            </form>
            <form className="userInfo_form--item">
              <label>Your Email:</label>
              <div className="userInfo_form--input ">
                <input
                  value={currentUser.email}
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={emailRef}
                  readOnly
                />
              </div>
            </form>
            <form className="userInfo_form--item">
              <label>Your Phone Number:</label>
              <div className="userInfo_form--input">
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  pattern="[0-9]{10,11}"
                  value={userInfo.phoneNumber}
                  ref={phoneRef}
                  onChange={handleInputChange}
                />
              </div>
            </form>
            <form className="userInfo_form--item">
              <label>Your Identity Card Number:</label>
              <div className="userInfo_form--input">
                <input
                  value={userInfo.identity}
                  type="text"
                  name="identity"
                  placeholder="Card Number"
                  ref={identityRef}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
        </section>
        {/* User info form */}
      </section>
      {/* SECLECT ROOMS */}
      <section className="selectRoom">
        <h4 className="bookingInfo__title">
          <strong>Select Room</strong>
        </h4>
        {roomsOfHotel.length > 0 ? renderAvailableRooms(roomsOfHotel) : <></>}
      </section>
      {/* PAYMENT AND RESERVATION */}
      <section className="finalCheck">
        <h4 className="bookingInfo__title">
          <strong>Total Bill: ${totalPrice}</strong>
        </h4>
        <section className="finalCheck__wrapper">
          <select className="finalCheck__options" ref={paymentRef}>
            <option value="Select">Select payment method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
          <div className="finalCheck__button">
            <button type="submit">Reserve Now</button>
          </div>
        </section>
      </section>
    </form>
  );
};

export default BookingForm;
