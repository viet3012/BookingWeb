import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import BookingForm from "../../components/bookingForm/BookingForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "../../utils/axios";

const Hotel = () => {
  const [hotel, setHotel] = useState({});
  const [isFormOpen, setFormOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    const getHotel = async () => {
      const res = await axios.get(`/get-hotel/${id}`);
      setHotel(res.data);
    };
    getHotel();
  }, []);

  let photos = [];
  if (hotel.photos?.length != undefined) {
    photos = hotel.photos.map((photo) => {
      return { src: photo };
    });
  }

  const handleFormOpen = () => {
    if (!isLogin) {
      navigate("/login");
    } else {
      setFormOpen(!isFormOpen);
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleFormOpen}>
            Reserve or Book Now!
          </button>
          <h1 className="hotelTitle">
            <strong>{hotel.name}</strong>
          </h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotel.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {hotel.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${hotel.cheapestPrice} at this property and get a
            free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo) => (
              <div className="hotelImgWrapper">
                <img src={photo.src} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">
                <strong>{hotel.title}</strong>
              </h1>
              <p className="hotelDesc">{hotel.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for stay!</h1>
              <span>
                This property has an {hotel.rateText} location score of{" "}
                {hotel.rating}!
              </span>
              <h2>
                <b>${hotel.cheapestPrice}</b> (1 nights)
              </h2>
              <button onClick={handleFormOpen}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        {isFormOpen ? <BookingForm hotel={hotel} /> : <></>}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
