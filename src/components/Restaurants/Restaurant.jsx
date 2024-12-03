import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Restaurant.module.css';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  const getRestaurantsList = async () => {
    try {
      const { data } = await axios.get('/restaurant');
      setRestaurants(data.data); // Assuming `data.data` contains the list of restaurants
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  useEffect(() => {
    getRestaurantsList();
  }, []);

  const handleRedirect = (id) => {
    navigate(`/productpage/${id}`); 
  };

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        spaceBetween={16}
        slidesPerView={1.5}
        breakpoints={{
          540: { slidesPerView: 2.3 },
          640: { slidesPerView: 3.3 },
          892: { slidesPerView: 4.2 },
          1024: { slidesPerView: 5.2 },
          1120: { slidesPerView: 5.5 },
        }}
        pagination={{ clickable: true }}
        className={styles.swiper}
      >
        {restaurants?.map((item) => (
          <SwiperSlide key={item._id} className={styles.slide}>
            <div className={styles.card} onClick={()=>{handleRedirect(item._id)}}>
                <div className={styles.cardImageContainer}>
                    <img
                    src={item.imageUrl}
                    alt={item.name}
                    className={styles.cardImage}
                    />
                </div>
              <p className={styles.cardText}>{item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
