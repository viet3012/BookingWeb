import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import HotelList from "./pages/hotelList/HotelList";
import AddHotel from "./pages/addHotel/AddHotel";
import RoomList from "./pages/roomList/RoomList";
import AddRoom from "./pages/addRoom/AddRoom";
import EditRoom from "./pages/addRoom/EditRoom";
import EditHotel from "./pages/addHotel/EditHotel";
import TransactionList from "./pages/transactionList/TransactionList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/hotels" element={<HotelList />} />
        <Route exact path="/rooms" element={<RoomList />} />
        <Route exact path="/transactions" element={<TransactionList />} />
        <Route exact path="/add-hotel" element={<AddHotel />} />
        <Route exact path="/edit-hotel/:id" element={<EditHotel />} />
        <Route exact path="/add-room" element={<AddRoom />} />
        <Route exact path="/edit-room/:id" element={<EditRoom />} />
        <Route path="*" element={<h1>NOT FOUND PAGE</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
