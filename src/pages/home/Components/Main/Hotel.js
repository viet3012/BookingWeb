import React from "react";
import HotelItem from "./HotelItem";

const Hotel = () => {
  const DUMMY_HOTEL = [
    {
      name: "Aparthotel Stare Miasto",
      city: "Madrid",
      price: 120,
      rate: 8.9,
      type: "Excellent",
      image_url: "./images/hotel_1.webp",
    },
    {
      name: "Comfort Suites Airport",
      city: "Austin",
      price: 140,
      rate: 9.3,
      type: "Exceptional",
      image_url: "./images/hotel_2.jpg",
    },
    {
      name: "Four Seasons Hotel",
      city: "Lisbon",
      price: 99,
      rate: 8.8,
      type: "Excellent",
      image_url: "./images/hotel_3.jpg",
    },
    {
      name: "Hilton Garden Inn",
      city: "Berlin",
      price: 105,
      rate: 8.9,
      type: "Excellent",
      image_url: "./images/hotel_4.jpg",
    },
  ];
  return (
    <div className="hotel">
      <h2 className="hotel__title">Homes guests love</h2>
      <div className="hotel__image">
        {DUMMY_HOTEL.map((item, index) => (
          <HotelItem
            key={item.index}
            name={item.name}
            city={item.city}
            price={item.price}
            rate={item.rate}
            type={item.type}
            image_url={item.image_url}
          />
        ))}
      </div>
    </div>
  );
};

export default Hotel;
