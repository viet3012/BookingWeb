import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../wrapper/Wrapper";
import axios from "../../utils/axios";
import "../../App.css";
import "./addHotel.css";

const AddHotel = () => {
  const navigate = useNavigate();
  const [roomList, setRoomList] = useState([]);
  const [rooms, setRooms] = useState([]);

  const nameRef = useRef();
  const cityRef = useRef();
  const distanceRef = useRef();
  const descriptionRef = useRef();
  const imagesRef = useRef();
  const typeRef = useRef();
  const addressRef = useRef();
  const titleRef = useRef();
  const priceRef = useRef();
  const featuredRef = useRef();

  useEffect(() => {
    const getAllRoom = async () => {
      const res = await axios.get("/get-all-room");
      if (res) {
        setRoomList(res.data);
      }
    };
    getAllRoom();
  }, []);

  const handleSelect = (e) => {
    var options = e.target;
    var room = [];

    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        room[i] = options[i].value;
      }
    }
    var filteredRoom = room.filter((item) => item !== null);
    setRooms(filteredRoom);
  };

  const handleAddHotel = async (event) => {
    event.preventDefault();
    const hotel = {
      name: nameRef.current.value,
      city: cityRef.current.value,
      distance: distanceRef.current.value,
      description: descriptionRef.current.value,
      images: imagesRef.current.value.split(",").map((item) => item),
      type: typeRef.current.value,
      address: addressRef.current.value,
      title: titleRef.current.value,
      price: priceRef.current.value,
      featured: featuredRef.current.value,
      rooms: rooms,
    };
    console.log(hotel.images);
    if (hotel.featured === "No") {
      hotel.featured = false;
    } else {
      hotel.featured = true;
    }

    // Kiểm tra các điều kiện
    if (
      hotel.name === "" ||
      hotel.city === "" ||
      hotel.distance === "" ||
      hotel.description === "" ||
      hotel.images === "" ||
      hotel.type === "" ||
      hotel.address === "" ||
      hotel.title === "" ||
      hotel.price === "" ||
      hotel.featured === "" ||
      hotel.rooms === ""
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    await axios.post("/add-new-hotel", hotel);
    navigate("/hotels");
  };

  return (
    <Wrapper>
      <section className="addHotel__container py-3">
        <section className="addHotel__wrapper">
          <div className="table_wrapper shadow p-4 bg-white rounded">
            <h3>Add New Hotel</h3>
            <div className="addHotel__form--wrapper">
              <form action="">
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="addHotel__form--item align-items-center">
                      <label>Name</label>
                      <input
                        className={`addHotel__form--input input-underline input-outline-none`}
                        type="text"
                        name="name"
                        ref={nameRef}
                      />
                    </div>
                    <div className="addHotel__form--item align-items-center">
                      <label>City</label>
                      <input
                        className={`addHotel__form--input input-underline input-outline-none`}
                        type="text"
                        name="city"
                        ref={cityRef}
                      />
                    </div>
                    <div className="addHotel__form--item align-items-center">
                      <label>Distance from City Center</label>
                      <input
                        className={`addHotel__form--input input-underline input-outline-none`}
                        type="text"
                        name="distance"
                        ref={distanceRef}
                      />
                    </div>
                    <div className="addHotel__form--item align-items-center">
                      <label>Description</label>
                      <input
                        className={`addHotel__form--input input-underline input-outline-none`}
                        type="text"
                        name="description"
                        ref={descriptionRef}
                      />
                    </div>
                    <div className={`addHotel__form--item align-items-center`}>
                      <label>Images</label>
                      <textarea
                        className="w-100 input-outline-none select"
                        name="images"
                        ref={imagesRef}
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="addHotel__form--item align-items-center">
                      <label>Type</label>
                      <input
                        className={`addHotel__form--input input-underline input-outline-none`}
                        type="text"
                        name="type"
                        ref={typeRef}
                      />
                    </div>
                    <div className="addHotel__form--item align-items-center">
                      <label>Address</label>
                      <input
                        className={`addHotel__form--input input-underline input-outline-none`}
                        type="text"
                        name="address"
                        ref={addressRef}
                      />
                    </div>
                    <div className="addHotel__form--item align-items-center">
                      <label>Title</label>
                      <input
                        className={`addHotel__form--input input-underline input-outline-none`}
                        type="text"
                        name="title"
                        ref={titleRef}
                      />
                    </div>
                    <div className="addHotel__form--item align-items-center">
                      <label>Price</label>
                      <input
                        className={`addHotel__form--input input-underline input-outline-none`}
                        type="text"
                        name="price"
                        ref={priceRef}
                      />
                    </div>
                    <div className="addHotel__form--item">
                      <label>Featured</label>
                      <select className="select" ref={featuredRef}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>
                  <div className="addHotel__form--item align-items-center">
                    <label>Rooms</label>
                    <select
                      className="room__options input-outline-none select"
                      multiple
                      size="4"
                      onChange={(e) => handleSelect(e)}
                    >
                      {roomList.map((room, i) => (
                        <option value={room._id}>{room.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 mt-2 d-flex justify-content-center">
                    <button
                      className="addHotel__button button button--green "
                      onClick={handleAddHotel}
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

export default AddHotel;
