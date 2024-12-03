import React, { useContext, useEffect, useState } from "react";
import styles from "./AddressPage.module.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function AddressPage() {
  const { setSelectedAddress } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newAddress, setNewAddress] = useState({
    state: "",
    city: "",
    pincode: "",
    phone: "",
    fullAddress: "",
  })
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1);  // Navigate to the previous page
  }

  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(savedAddresses);
  }, []);

  const saveToLocalStorage = (updatedAddresses) => {
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const saveAddress = () => {
    let updatedAddresses;
    if (editingIndex !== null) {
      updatedAddresses = [...addresses];
      updatedAddresses[editingIndex] = newAddress;
    } else {
      updatedAddresses = [...addresses, newAddress];
    }
    setAddresses(updatedAddresses);
    saveToLocalStorage(updatedAddresses);
    setEditingIndex(null);
    setNewAddress({
      state: "",
      city: "",
      pincode: "",
      phone: "",
      fullAddress: "",
    });
    setIsPopupOpen(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewAddress(addresses[index]);
    setIsPopupOpen(true);
  };

  const handleRemove = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    saveToLocalStorage(updatedAddresses);
  };

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  const handleSetAsDefault = (index) => {
    setSelectedAddressIndex(index);
    setSelectedAddress(addresses[index]);
  };

  return (
    <div>
      <Navbar />

      <div className={styles.yourAddress}>
        <h1>
          <FaArrowLeft onClick={handleGoBack} /> Your Address
        </h1>
      </div>

      <div className={styles.addAddress}>
        <div className={styles.addButton} onClick={togglePopup}>
          <button>+</button>
          <p>Add Address</p>
        </div>

        <div className={styles.cardAddress}>
          {addresses.map((address, index) => (
            <div
              key={index}
              className={`${styles.saveAddress} ${
                selectedAddressIndex === index ? styles.selected : ""
              }`}
            >
              <h3>
                {user?.name || ""}
                {index === selectedAddressIndex && (
                  <span
                    className={styles.defaultBadge}
                    onClick={() => handleSetAsDefault(index)}
                  >
                    Default
                  </span>
                )}
              </h3>

              <p>
                {address.fullAddress}
                <br />
                {address.city}, {address.pincode}, India
              </p>
              <p>{address.phone}</p>
              <div className={styles.actions}>
                <button
                  className={styles.actionButton}
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <div className={styles.divider}></div>
                <button
                  className={styles.actionButton}
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>
              <HiOutlineLocationMarker className={styles.loc} />
              Add Address
            </h3>
            <div className={styles.row}>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={newAddress.state}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City/District"
                value={newAddress.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={newAddress.pincode}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={newAddress.phone}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="fullAddress"
              placeholder="Enter full address"
              value={newAddress.fullAddress}
              onChange={handleChange}
            ></textarea>
            <button className={styles.saveButton} onClick={saveAddress}>
              Save
            </button>
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
