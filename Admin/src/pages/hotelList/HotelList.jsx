import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Wrapper from "../wrapper/Wrapper";

import "../../App.css";
import "./hotelList.css";

const HotelList = () => {
  const [hotelList, setHotelList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllHotel = async () => {
      const res = await axios.get("/get-all-hotel");
      setHotelList(res.data);
    };
    getAllHotel();
  }, [hotelList]);

  const handleDeleteHotel = async (item) => {
    const result = window.confirm("Bạn chắc chắn muốn xoá ?");
    if (result === false) {
      return;
    } else {
      await axios.post("/delete-hotel", { id: item._id }).then((res) => {
        if (res.data === "booking") {
          alert("Khách sạn có khách đang đặt, không thể xoá!");
        }
      });
    }
  };
  const handleEdit = async (id) => {
    navigate(`/edit-hotel/${id}`);
  };

  return (
    <Wrapper>
      <section className="hotelList__container py-3">
        <section className="hotelList__wrapper">
          <div className="table_wrapper position-relative shadow p-4 bg-white rounded">
            <div className="d-flex justify-content-between">
              <h3>Hotel List</h3>
              <button
                onClick={() => navigate("/add-hotel")}
                className="button--add button button--green"
              >
                Add new hotel
              </button>
            </div>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hotelList.length > 0 ? (
                  hotelList.map((hotel, i) => (
                    <tr key={i}>
                      <td>{++i}</td>
                      <td>{hotel._id}</td>
                      <td>{hotel.name}</td>
                      <td>{hotel.type}</td>
                      <td>{hotel.title}</td>
                      <td>{hotel.city}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteHotel(hotel)}
                          className="button--delete button button--red"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEdit(hotel._id)}
                          className="button--delete button button--green"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No hotel found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </section>
      </section>
    </Wrapper>
  );
};

export default HotelList;
