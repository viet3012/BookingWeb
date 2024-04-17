import React from "react";
import "./DetailList.css";

const DetailList = () => {
  const DUMMY_DETAIL = {
    name: "Tower Street Apartments",
    address: "Elton St 125 New york",
    distance: "Excellent location - 500m from center",
    price: "Book a stay over $114 at this property and get a free airport taxi",
    photos: [
      "./images/hotel_detail_1.jpg",
      "./images/hotel_detail_2.jpg",
      "./images/hotel_detail_3.jpg",
      "./images/hotel_detail_4.jpg",
      "./images/hotel_detail_5.jpg",
      "./images/hotel_detail_6.jpg",
    ],
    title: "Stay in the heart of City",
    description:
      "Located a 5-minute walk from St. Florian's Gate in Krakow, Tower Street Apartments has accommodations with air conditioning and free WiFi.The units come with hardwood floors and feature a fully equipped kitchenette with a microwave, a flat - screen TV, and a private bathroom with shower and a hairdryer. A fridge is also offered, as well as an electric tea pot and a coffee machine.Popular points of interest near the apartment include Cloth Hall, Main Market Square and Town Hall Tower.The nearest airport is John Paul II International Kraków - Balice, 16.1 km from Tower Street Apartments, and the property offers a paid airport shuttle service.",
    nine_night_price: 955,
  };
  return (
    <div>
      <div className="detail-list__top">
        <button type="button" className="detail-list__button-top">
          Reserve or Book Now!
        </button>
        <h2 className="detail-list__name">{DUMMY_DETAIL.name}</h2>
        <span className="fa fa-map-marker"></span>
        <span className="detail-list__address">{DUMMY_DETAIL.address}</span>
        <p className="detail-list__distance">{DUMMY_DETAIL.distance}</p>
        <p className="detail-list__price">{DUMMY_DETAIL.price}</p>
      </div>
      <div className="detail-list__images">
        <img src={`${DUMMY_DETAIL.photos[0]}`} alt="" width="380px" />
        <img src={`${DUMMY_DETAIL.photos[1]}`} alt="" width="380px" />
        <img src={`${DUMMY_DETAIL.photos[2]}`} alt="" width="380px" />
        <img src={`${DUMMY_DETAIL.photos[3]}`} alt="" width="380px" />
        <img src={`${DUMMY_DETAIL.photos[4]}`} alt="" width="380px" />
        <img src={`${DUMMY_DETAIL.photos[5]}`} alt="" width="380px" />
      </div>
      <div className="detail-list__bottom">
        <div>
          <h2 className="detail-list__title">{DUMMY_DETAIL.title}</h2>
          <p>{DUMMY_DETAIL.description}</p>
        </div>
        <div className="detail-list__night">
          <h3>Perfect for a 9-night stay!</h3>
          <p className="detail-list__night-description">
            Located in the real heart of Krakow, this property has an excellent
            location score of 9.8!
          </p>
          <p className="detail-list__night-price">
            <b>${DUMMY_DETAIL.nine_night_price}</b> (9 nights)
          </p>
          <button type="button" className="detail-list__button-bottom">
            Reserve or Book Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailList;
