import React from "react";
import DetailList from "./Components/DetailList";
import NavBar from "../home/Components/Header/NavBar";
import Form from "../home/Components/Footer/Form";
import Footer from "../home/Components/Footer/Footer";

const Detail = () => {
  return (
    <div>
      <NavBar />
      <DetailList />
      <Form />
      <Footer />
    </div>
  );
};

export default Detail;
