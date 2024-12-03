import React from 'react'
import styles from './OrderSuccessfull.module.css'
import checkIcon from "../../assets/checkIcon.png";
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

export default function OrderSucessull() {

    const navigate = useNavigate(); // Initialize the navigate function

  const handleBackToHome = () => {
    navigate('/homepage'); // Navigate to the homepage (assuming '/' is the homepage route)
  };

  return (
    <div>
      <Navbar />

      <div className={styles.success}>
        <img src={checkIcon} alt='check' />
        <h1>Order Placed Successfully</h1>
        <p className={styles.successPara}>Your order is confirmed and on its way. Get set to <br/> savor your chosen delights!</p>
        <div className={styles.successOrder}>
            <p>Royal Cheese Burger</p>
            <p>Potato Veggies</p>
            <p>Coke Coca Cola</p>
            <button onClick={handleBackToHome}>Back to Home</button>
        </div>
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  )
}
