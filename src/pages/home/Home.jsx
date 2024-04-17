import React from "react";
import NavBar from "./Components/Header/NavBar";
import Header from "./Components/Header/Header";
import City from "./Components/Main/City";
import Type from "./Components/Main/Type";
import Hotel from "./Components/Main/Hotel";
import Form from "./Components/Footer/Form";
import Footer from "./Components/Footer/Footer";
import "./Components/Header/NavBar.css";

const Home = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Header></Header>
      <City></City>
      <Type></Type>
      <Hotel></Hotel>
      <Form></Form>
      <Footer></Footer>
    </div>
  );
};

export default Home;
