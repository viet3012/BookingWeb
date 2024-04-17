import React from "react";
import SearchList from "./Components/SearchList";
import SearchPopup from "./Components/SearchPopup";
import NavBar from "../home/Components/Header/NavBar";
import Form from "../home/Components/Footer/Form";
import Footer from "../home/Components/Footer/Footer";

const Search = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="search">
        <SearchPopup></SearchPopup>
        <SearchList></SearchList>
      </div>
      <Form></Form>
      <Footer></Footer>
    </div>
  );
};

export default Search;
