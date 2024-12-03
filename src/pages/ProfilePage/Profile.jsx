import React, { useContext, useState } from "react";
import styles from "./Profile.module.css";
import profilePhoto from "../../assets/profilePhoto.png";
import { FaArrowLeft } from "react-icons/fa6";
import Footer from "../../components/Footer/Footer";
import { FaCreditCard } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [showEditPopup, setShowEditPopup] = useState(false)
  const { user } = useContext(UserContext)
  const [isEditing, setIsEditing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiration: "",
    cvc: "",
    name: "",
  });
  const userName = localStorage.getItem('name')
  const userEmail = localStorage.getItem('email')
  const [savedCards, setSavedCards] = useState([])
  const [profileData, setProfileData] = useState({
    fullName: userName,
    email: userEmail,
    gender: "",
    country: "",
  })

  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1);  
  }

  const handleEditCardClick = () => {
    setShowEditPopup(true);
  };

  const handleClosePopup = () => {
    setShowEditPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditProfileClick = () => {
    if (isEditing) {
      console.log("Profile data saved:", profileData);
    }
    setIsEditing(!isEditing); 
  };

  const handleRemove = () => {
    setCardDetails({
      cardNumber: "",
      expiration: "",
      cvc: "",
      name: "",
    });
  };

  const handleSaveChanges = () => {
    if (cardDetails.cardNumber.length === 16) {
      setSavedCards((prevCards) => [...prevCards, cardDetails]);
      handleClosePopup(); 
      handleRemove(); 
    } else {
      alert("Card number must be 16 digits.");
    }
  };

  const maskCardNumber = (cardNumber) => {
    return "xxxx-xxxx-xxxx-" + cardNumber.slice(-4);
  }

  const handleSaveProfileChanges = () => {
    setIsEditing(false)
  };

  return (
    <div>
      <Navbar />

      <div className={styles.profileText}>
        <h1>
          <FaArrowLeft onClick={handleGoBack}/>
          My Profile
        </h1>
      </div>

      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.profileInfo}>
            <img
              src={profilePhoto}
              alt="Profile Picture"
              className={styles.profileImage}
            />
            <div className={styles.name}>{userName}</div>
          </div>
          <button className={styles.editBtn} onClick={isEditing ? handleSaveProfileChanges : handleEditProfileClick}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className={styles.profileInfoSection}>
          <div className={styles.infoGroup}>
            <label htmlFor="full-name">Full Name</label>
            <input
              id="full-name"
              type="text"
              onChange={handleInputChange}
              value={profileData.fullName}
              readOnly={!isEditing}
              className={styles.input}
            />
          </div>
          <div className={styles.infoGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              onChange={handleInputChange}
              value={profileData.email}
              readOnly={!isEditing}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.profileInfoSection}>
          <div className={styles.infoGroup}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={profileData.gender}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={styles.input}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className={styles.infoGroup}>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              value="India"
              readOnly={!isEditing}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.paymentMethods}>
          <h3>Saved Payment Methods</h3>
          <div className={styles.cardList}>
            {savedCards.map((card, index) => (
              <div className={styles.cardItem} key={index}>
                <div className={styles.cardDetails}>
                  <FaCreditCard className={styles.cardIcon} />
                  <div>
                    <span>{maskCardNumber(card.cardNumber)}</span>
                    <span>{card.name}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className={styles.addNew} onClick={handleEditCardClick}>
              <button>
                {" "}
                <span>+</span>Add New Card
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEditPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Edit Payment Method</h2>
            <div className={styles.popupField}>
              <label>Card Number</label>
              <input
                type="text"
                placeholder="Enter Card Number"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                maxLength="16"
              />
            </div>
            <div className={styles.popupField}>
              <label>Expiration</label>
              <input
                type="text"
                placeholder="MM/YY"
                name="expiration"
                value={cardDetails.expiration}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.popupField}>
              <label>CVC</label>
              <input
                type="text"
                placeholder="Enter CVC"
                name="cvc"
                value={cardDetails.cvc}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.popupField}>
              <label>Name on Card</label>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={cardDetails.name}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.popupActions}>
              <button className={styles.removeButton} onClick={handleRemove}>
                Remove
              </button>
              <div className={styles.popupButtons}>
                <button onClick={handleClosePopup}>Cancel</button>
                <button onClick={handleSaveChanges}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
