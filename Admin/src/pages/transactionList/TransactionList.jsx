import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "../../utils/axios";
import Wrapper from "../wrapper/Wrapper";

import "../../App.css";
import "./transactionList.css";

const TransactionList = () => {
  const [tranList, setTranList] = useState([]);

  useEffect(() => {
    const getRenderData = async () => {
      const res = await axios.get("/get-all-transaction");
      setTranList(res.data);
    };
    getRenderData();
  }, []);

  return (
    <Wrapper>
      <section className="dashboard__container py-3">
        <section className="dashboard__wrapper">
          <section className="row">
            <div className="col-12">
              <div className="table_wrapper shadow p-4 bg-white rounded">
                <h3>Transactions List</h3>
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ID</th>
                      <th>User</th>
                      <th>Hotel</th>
                      <th>Room</th>
                      <th>Date</th>
                      <th>Price</th>
                      <th>Payment method</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tranList.length > 0 ? (
                      tranList.map((item, i) => (
                        <tr key={i}>
                          <td>{++i}</td>
                          <td>{item._id}</td>
                          <td>{item.user.name}</td>
                          <td>{item.hotelName}</td>
                          <td>
                            {item.rooms.map((room, i) => {
                              if (i > 0) {
                                return "," + room.roomNumber.number;
                              } else {
                                return room.roomNumber.number;
                              }
                            })}
                          </td>
                          <td>
                            {new Date(item.dateStart).getDate() +
                              "/" +
                              parseInt(
                                new Date(item.dateStart).getMonth() + 1
                              ) +
                              "/" +
                              new Date(item.dateStart).getFullYear() +
                              " - " +
                              new Date(item.dateEnd).getDate() +
                              "/" +
                              parseInt(new Date(item.dateEnd).getMonth() + 1) +
                              "/" +
                              new Date(item.dateEnd).getFullYear()}
                          </td>
                          <td>${item.price}</td>
                          <td>{item.payment}</td>
                          <td>
                            <div
                              className={`${
                                item.status === "Booked"
                                  ? "booked__status"
                                  : item.status === "Checkin"
                                  ? "checkin__status"
                                  : "checkout__status"
                              }`}
                            >
                              <span>{item.status}</span>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9}>No Transaction Found</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </section>
        </section>
      </section>
    </Wrapper>
  );
};

export default TransactionList;
