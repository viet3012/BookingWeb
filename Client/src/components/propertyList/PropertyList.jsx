import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import "./propertyList.css";

const PropertyList = () => {
  const [hotelByType, setHotelByType] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/get-hotels");
        setHotelByType(res.data.hotelByType);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    getData();
  }, []);

  return (
    <div className="pList">
      {hotelByType.map((item) => (
        <div key={item.type} className="pListItem">
          <img src={item.imageUrl} alt={item.type} className="pListImg" />
          <div className="pListTitles">
            <h1>{item.type}</h1>
            <h2>
              {item.quantity} {item.type}s
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
