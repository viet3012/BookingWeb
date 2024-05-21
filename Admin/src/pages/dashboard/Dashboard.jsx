import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Wrapper from "../wrapper/Wrapper";
import axios from "../../utils/axios";
import "../../App.css";
import "./dashboard.css";

const Dashboard = () => {
  const [latestList, setLatestList] = useState([]);
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    const getTransaction = async () => {
      const res = await axios.get("/get-latest-transaction");
      setLatestList(res.data);
    };
    getTransaction();
  }, [latestList]);

  useEffect(() => {
    const getDashboard = async () => {
      const res = await axios.get("/get-dashboard");
      setDashboard(res.data);
    };
    getDashboard();
  }, [dashboard]);

  return (
    <Wrapper>
      <section className="dashboard__container py-3">
        <section className="dashboard__wrapper">
          <section className="row">
            <div className="col-3">
              <div className="shadow p-3 mb-5 bg-white rounded position-relative">
                <span>USERS</span>
                <h1>{dashboard.users ? dashboard.users : 0}</h1>
                <div className="dashboard__icon icon__user">
                  <i class="fa-regular fa-user" style={{ color: "red" }}></i>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="shadow p-3 mb-5 bg-white rounded position-relative">
                <span>ORDERS</span>
                <h1>{dashboard.orders ? dashboard.orders : 0}</h1>
                <div className="dashboard__icon icon__order">
                  <i
                    class="fa-solid fa-cart-shopping"
                    style={{ color: "var(--yellow-x)" }}
                  ></i>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="shadow p-3 mb-5 bg-white rounded position-relative">
                <span>EARNING</span>
                <h1>${dashboard.earning ? dashboard.earning : 0}</h1>
                <div className="dashboard__icon icon__earning">
                  <i
                    class="fa-solid fa-sack-dollar"
                    style={{ color: "green" }}
                  ></i>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="shadow p-3 mb-5 bg-white rounded position-relative">
                <span>BALANCE</span>
                <h1>${dashboard.balance ? dashboard.balance : 0}</h1>
                <div className="dashboard__icon icon__balance">
                  <i class="fa-solid fa-wallet" style={{ color: "var(--purple-x)" }}></i>
                </div>
              </div>
            </div>
          </section>
          <section className="row">
            <div className="col-12">
              <div className="table_wrapper shadow p-4 bg-white rounded">
                <h3>Latest Transactions</h3>
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
                      <th>Payment Method</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestList.length > 0 ? (
                      latestList.map((item, i) => (
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

export default Dashboard;
