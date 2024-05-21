import { useState, useEffect } from "react";
import "./featured.css";
import axios from "../../utils/axios";

const Featured = () => {
  const [hotelByCity, setHotelByCity] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/get-hotels");
        setHotelByCity(res.data.hotelByCity);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    getData();
  }, []);

  return (
    <section className="featured">
      {hotelByCity.map((item) => (
        <div key={item.cityName} className="featuredItem">
          <img src={item.imageUrl} alt="" className="featuredImg" />
          <div className="featuredTitles">
            <h1>{item.cityName}</h1>
            <h2>{item.quantity} properties</h2>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Featured;
