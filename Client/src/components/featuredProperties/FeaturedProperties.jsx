import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const [hotelByRating, setHotelByRating] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/get-hotels");
        setHotelByRating(res.data.hotelByRating);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    getData();
  }, []);

  return (
    <div className="fp">
      {hotelByRating.map((item) => (
        <div key={item._id} className="fpItem">
          <img src={item.photos[0]} alt={item.name} className="fpImg" />
          <span className="fpName">
            <a href={"/hotel/" + item._id}>{item.name}</a>
          </span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
