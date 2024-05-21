import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import Wrapper from "../wrapper/Wrapper";

import "../../App.css";
import "./addRoom.css";

const EditRoom = () => {
  const [hotelList, setHotelList] = useState([]);
  const [room, setRoom] = useState([]);
  const [roomNumber, setRoomNumber] = useState([]);

  const navigate = useNavigate();
  const params = useParams();
  const roomId = params.id;

  const titleRef = useRef();
  const priceRef = useRef();
  const maxpeopleRef = useRef();
  const descriptionRef = useRef();
  const roomsRef = useRef();
  const hotelRef = useRef();

  useEffect(() => {
    const getHotel = async () => {
      const res = await axios.get(`/get-room/${roomId}`);
      if (res) {
        setRoom(res.data);
      }
    };
    getHotel();
  }, [roomId]);

  useEffect(() => {
    const getAllHotel = async () => {
      const res = await axios.get("/get-all-hotel");
      if (res) {
        setHotelList(res.data);
      }
    };
    getAllHotel();
  }, []);

  const handleAddRoom = async (event) => {
    event.preventDefault();
    const room = {
      rooms: roomsRef.current.value.split(",").map((item) => parseInt(item)),
      hotel: hotelRef.current.value,
      maxPeople: maxpeopleRef.current.value,
      price: priceRef.current.value,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    };
    if (
      room.rooms === "" ||
      room.hotel === "" ||
      room.maxPeople === "" ||
      room.price === "" ||
      room.title === "" ||
      room.description === ""
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    await axios.post(`/edit-room/${roomId}`, room);
    navigate("/rooms");
  };

  const temp = [];
  useEffect(() => {
    const getRoomNumber = async () => {
      for (var i = 0; i < room.roomNumbers.length; i++) {
        temp[i] = room.roomNumbers[i].number;
      }
      setRoomNumber(temp);
    };
    getRoomNumber();
  }, [room.roomNumbers]);

  return (
    <Wrapper>
      <section className="addHotel__container py-3">
        <section className="addHotel__wrapper">
          <div className="table_wrapper shadow p-4 bg-white rounded">
            <h3>Edit Room</h3>
            <div className="addHotel__form--wrapper">
              <form action="">
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="addHotel__form--item align-items-center">
                      <label>Title</label>
                      <input
                        className={`addHotel__form--input input-underline input-outline-none`}
                        type="text"
                        name="title"
                        ref={titleRef}
                        defaultValue={room.title}
                      />
                    </div>
                    <div className="addHotel__form--item align-items-center">
                      <label>Description</label>
                      <input
                        className={`addHotel__form--input input-underline input-outline-none`}
                        type="text"
                        name="description"
                        ref={descriptionRef}
                        defaultValue={room.desc}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="addHotel__form--item align-items-center">
                      <label>Price</label>
                      <input
                        className={`addHotel__form--input input-underline input-outline-none`}
                        type="text"
                        name="price"
                        ref={priceRef}
                        defaultValue={room.price}
                      />
                    </div>
                    <div className="addHotel__form--item align-items-center">
                      <label>Max People</label>
                      <input
                        className={`addHotel__form--input input-underline input-outline-none`}
                        type="text"
                        name="maxpeople"
                        ref={maxpeopleRef}
                        defaultValue={room.maxPeople}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className={`addHotel__form--item align-items-center`}>
                      <label>Rooms</label>

                      <textarea
                        className="w-100 input-outline-none select"
                        name="rooms"
                        ref={roomsRef}
                        rows="2"
                        defaultValue={roomNumber}
                        placeholder=" Give comma between room numbers"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="addHotel__form--item">
                      <label>Choose a hotel</label>
                      <select
                        className={`addHotel__form--select input-outline-none w-100 mt-2`}
                        name="hotel"
                        ref={hotelRef}
                      >
                        {hotelList.map((option, i) => (
                          <option key={++i} value={option._id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-2 d-flex justify-content-center">
                    <button
                      onClick={handleAddRoom}
                      className={`addHotel__button button button--green`}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    </Wrapper>
  );
};

export default EditRoom;
