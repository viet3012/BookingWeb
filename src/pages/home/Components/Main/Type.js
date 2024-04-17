import React from "react";
import TypeItem from "./TypeItem";

const Type = () => {
  const DUMMY_TYPE = [
    {
      name: "Hotels",
      count: 233,
      image: "./images/type_1.webp",
    },
    {
      name: "Apartments",
      count: 2331,
      image: "./images/type_2.jpg",
    },
    {
      name: "Resorts",
      count: 2331,
      image: "./images/type_3.jpg",
    },
    {
      name: "Villas",
      count: 2331,
      image: "./images/type_4.jpg",
    },
    {
      name: "Cabins",
      count: 2331,
      image: "./images/type_5.jpg",
    },
  ];
  return (
    <div className="type">
      <h2 className="type__title">Browser by property type</h2>
      <div className="type__image">
        {DUMMY_TYPE.map((item) => (
          <TypeItem
            key={item.id}
            name={item.name}
            count={item.count}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Type;
