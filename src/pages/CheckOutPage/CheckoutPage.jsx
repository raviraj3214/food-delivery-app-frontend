import React from "react";
import styles from "./CheckoutPage.module.css";
import Restaurant from "../../components/Restaurants/Restaurant";
import Footer from "../../components/Footer/Footer";
import { FaArrowLeft } from "react-icons/fa6";
import icon from "../../assets/Icon.png";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateDiscount = (subtotal) => {
    return subtotal > 200 ? 3 : 0; // Discount logic
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount(subtotal);
    const deliveryFee = 30;
    return subtotal - discount + deliveryFee;
  };

  const handleAddressClick = () => {
    navigate("/addressPage");
  };

  const handlePaymentClick = () => {
    navigate("/paymentpage");
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount(subtotal);
  const deliveryFee = 30;
  const total = calculateTotal();

  return (
    <div>
      <Navbar />

      <div className={styles.orderText}>
        <h1>
          <FaArrowLeft className={styles.leftArrow} onClick={handleGoBack} />
          Your Order Details
        </h1>
      </div>

      <div className={styles.checkingContainer}>
        <div className={styles.leftSection}>
          {cartItems.map((item, index) => (
            <div key={index} className={styles.item}>
              <img
                src={item.image || "default_image_path"} // Assuming each item has an 'image' field
                alt={item.name}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p>{item.quantity} item{item.quantity > 1 ? "s" : ""}</p>
              </div>
              <span className={styles.itemPrice}>₹{item.price * item.quantity}</span>
              {index < cartItems.length - 1 && <div className={styles.thinLine}></div>}
            </div>
          ))}

          <div className={styles.notes}>
            <textarea placeholder="Add extra notes"></textarea>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.deliveryAddress} onClick={handleAddressClick}>
            <div className={styles.locationContainer}>
              <img src={icon} alt="Location" className={styles.locationIcon} />
              <div className={styles.textContainer}>
                <h4>Delivery Address</h4>
                <p>45, Green Street, Sector 12..</p>
              </div>
            </div>
            <div className={styles.arrowForward}>
              <IoIosArrowForward />
            </div>
          </div>

          <div className={styles.thinLine}></div>
          <div className={styles.orderSummary}>
            <div className={styles.summaryRow}>
              <span>Items</span>
              <span>₹{subtotal}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Discount</span>
              <span>- ₹{discount}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className={styles.thinLine}></div>
            <div className={styles.summaryTotal}>
              <span>Subtotal ({cartItems.length} item{cartItems.length > 1 ? "s" : ""})</span>
              <span className={styles.rupee}>₹{total}</span>
            </div>
          </div>

          <button className={styles.paymentButton} onClick={handlePaymentClick}>
            Choose Payment Method
          </button>
        </div>
      </div>

      <div className={styles.restro}>
        <Restaurant />
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}



// import React from "react";
// import styles from "./CheckoutPage.module.css";
// import items1 from "../../assets/items1.png";
// import items2 from "../../assets/items2.png";
// import items3 from "../../assets/items3.png";
// import Restaurant from "../../components/Restaurants/Restaurant";
// import Footer from "../../components/Footer/Footer";
// import { FaArrowLeft } from "react-icons/fa6";
// import icon from "../../assets/Icon.png";
// import { IoIosArrowForward } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar/Navbar";
// import { useDispatch, useSelector } from "react-redux";


// export default function CheckoutPage() {
//   const dispatch = useDispatch();
//   const cartItems = useSelector(state => state.cart.cartItems);
//   const navigate = useNavigate();

//   const handleGoBack = () => {
//     navigate(-1);  
//   }

//   const calculateTotal = () => {
//     const subtotal = cartItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//     const discount = subtotal > 200 ? 3 : 0;
//     const deliveryFee = 30;
//     return subtotal - discount + deliveryFee;
//   };

//   const handleAddressClick = () => {
//     navigate("/addressPage");
//   }

//   const handlePaymentClick = () => {
//     navigate("/paymentpage")
//   }

//   return (
//     <div>
//       <Navbar />

//       <div className={styles.orderText}>
//         <h1>
//           <FaArrowLeft className={styles.leftArrow} onClick={handleGoBack}/>
//           Your Order Details
//         </h1>
//       </div>
//       <div className={styles.checkingContainer}>
//         <div className={styles.leftSection}>
//           <div className={styles.item}>
//             <img
//               src={items1}
//               alt="Royal Cheese Burger"
//               className={styles.itemImage}
//             />
//             <div className={styles.itemDetails}>
//               <h3>Royal Cheese Burger</h3>
//               <p>1 item</p>
//             </div>
//             <span className={styles.itemPrice}>₹120</span>
//           </div>
//           <div className={styles.thinLine}></div>
//           <div className={styles.item}>
//             <img
//               src={items2}
//               alt="Potato Veggies"
//               className={styles.itemImage}
//             />
//             <div className={styles.itemDetails}>
//               <h3>Potato Veggies</h3>
//               <p>1 item</p>
//             </div>
//             <span className={styles.itemPrice}>₹77</span>
//           </div>
//           <div className={styles.thinLine}></div>
//           <div className={styles.item}>
//             <img
//               src={items3}
//               alt="Cake Coca Cola"
//               className={styles.itemImage}
//             />
//             <div className={styles.itemDetails}>
//               <h3>Cake Coca Cola</h3>
//               <p>1 item</p>
//             </div>
//             <span className={styles.itemPrice}>₹42</span>
//           </div>
//           <div className={styles.notes}>
//             <textarea placeholder="Add extra notes"></textarea>
//           </div>
//         </div>

//         <div className={styles.rightSection}>
//           <div className={styles.deliveryAddress} onClick={handleAddressClick}>
//             <div className={styles.locationContainer}>
//               <img src={icon} alt="Location" className={styles.locationIcon} />
//               <div className={styles.textContainer}>
//                 <h4>Delivery Address</h4>
//                 <p>45, Green Street, Sector 12..</p>
//               </div>
//             </div>
//             <div className={styles.arrowForward}>
//               <IoIosArrowForward />
//             </div>
//           </div>

//           <div className={styles.thinLine}></div>
//           <div className={styles.orderSummary}>
//             <div className={styles.summaryRow}>
//               <span>Items</span>
//               <span>₹239</span>
//             </div>
//             <div className={styles.summaryRow}>
//               <span>Service Fee</span>
//               <span>₹1</span>
//             </div>
//             <div className={styles.thinLine}></div>
//             <div className={styles.summaryTotal}>
//               <span>Subtotal (3 items)</span>
//               <span className={styles.rupee}>₹240</span>
//             </div>
//           </div>
//           <button className={styles.paymentButton} onClick={handlePaymentClick}>
//             Choose Payment Method
//           </button>
//         </div>
//       </div>

//       <div className={styles.restro}>
//         <Restaurant />
//       </div>

//       <div className={styles.footer}>
//         <Footer />
//       </div>
//     </div>
//   );
// }
