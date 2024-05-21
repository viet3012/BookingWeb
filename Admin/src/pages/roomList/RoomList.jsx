import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Wrapper from "../wrapper/Wrapper";

import "../../App.css";
import "./roomList.css";

const RoomList = () => {
  const [roomList, setRoomList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllRoom = async () => {
      const res = await axios.get("/get-all-room");
      setRoomList(res.data);
    };
    getAllRoom();
  }, [roomList]);

  const handleDeleteRoom = async (item) => {
    const result = window.confirm("Bạn chắc chắn muốn xoá ?");
    if (result == false) {
      return;
    } else {
      await axios.post("/delete-room", { id: item._id }).then((res) => {
        if (res.data === "booking") {
          alert("Phòng có khách đang đặt, không thể xoá!");
        }
      });
    }
  };
  const handleEditRoom = async (id) => {
    navigate(`/edit-room/${id}`);
  };

  return (
    <Wrapper>
      <section className="roomList__container py-3">
        <section className="roomList__wrapper">
          <div className="table_wrapper position-relative shadow p-4 bg-white rounded">
            <div className="d-flex justify-content-between">
              <h3>Room List</h3>
              <button
                onClick={() => navigate("/add-room")}
                className="button--add button button--green"
              >
                Add New
              </button>
            </div>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th width="100px">Max People</th>
                  <th width="150px">Action</th>
                </tr>
              </thead>
              <tbody>
                {roomList.length > 0 ? (
                  roomList.map((room, i) => (
                    <tr key={i}>
                      <td>{++i}</td>
                      <td>{room._id}</td>
                      <td>{room.title}</td>
                      <td className="roomList__table--desc">{room.desc}</td>
                      <td>{room.price}</td>
                      <td className="text-center">{room.maxPeople}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteRoom(room)}
                          className="button--delete button button--red"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEditRoom(room._id)}
                          className="button--delete button button--green"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No room found</td>
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

export default RoomList;
