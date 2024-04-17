import React from "react";
import CityItem from "./CityItem";

const City = () => {
  const DUMMY_CITY = [
    {
      name: "Dublin",
      subText: "123 properties",
      image: "./images/city_1.webp",
    },
    {
      name: "Reno",
      subText: "533 properties",
      image: "./images/city_2.webp",
    },
    {
      name: "Austin",
      subText: "532 properties",
      image: "./images/city_3.webp",
    },
  ];
  return (
    <div className="city">
      {DUMMY_CITY.map((item) => (
        <CityItem
          key={item.id}
          name={item.name}
          subText={item.subText}
          image={item.image}
        />
      ))}
    </div>
  );
};

export default City;
