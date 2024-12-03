import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
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
    fulladdress: "",
    phone: "",
  });
  const navigate = useNavigate();
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  // Fetch addresses on component mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`/user/addresses`);
      setAddresses(response.data); // Assuming backend sends user addresses
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const saveAddress = async () => {
    try {
      if (editingIndex !== null) {
        // Update address
        const updatedAddress = { ...newAddress };
        await axios.put(
          `/user/address/${addresses[editingIndex]._id}`,
          updatedAddress
        );
        fetchAddresses(); // Refresh the list
      } else {
        // Add new address
        await axios.post(`/user/address`, newAddress);
        fetchAddresses();
      }

      // Reset form and close popup
      setNewAddress({
        state: "",
        city: "",
        pincode: "",
        fulladdress: "",
        phone: "",
      });
      setEditingIndex(null);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Failed to save address:", error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewAddress(addresses[index]);
    setIsPopupOpen(true);
  };

  const handleRemove = async (index) => {
    try {
      const addressId = addresses[index]._id;
      await axios.delete(`/user/address/${addressId}`);
      fetchAddresses(); 
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  const handleSetAsDefault = async (index) => {
    try {
      const addressId = addresses[index]._id;
      await axios.patch(`/user/addresses/${addressId}/default`);
      fetchAddresses(); // Refresh the list to reflect changes
      setSelectedAddressIndex(index);
      setSelectedAddress(addresses[index]);
    } catch (error) {
      console.error("Failed to set default address:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
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
          {addresses?.map((address, index) => (
            <div
              key={address._id}
              className={`${styles.saveAddress} ${
                selectedAddressIndex === index ? styles.selected : ""
              }`}
            >
              <h3>
                {user?.name || ""}
                {index === selectedAddressIndex && (
                  <span className={styles.defaultBadge}>Default</span>
                )}
              </h3>
              <p>
                {address.fulladdress.substr(0,18)}
                <br />
                {address.city}, {address.pincode}, {address.state}
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
              {selectedAddressIndex !== index && (
                <button
                  className={styles.setDefaultButton}
                  onClick={() => handleSetAsDefault(index)}
                >
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {isPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>
              <HiOutlineLocationMarker className={styles.loc} />
              {editingIndex !== null ? "Edit Address" : "Add Address"}
            </h3>
            <div className={styles.row}>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={newAddress.phone}
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
                name="state"
                placeholder="State"
                value={newAddress.state}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="fulladdress"
              placeholder="Enter full address"
              value={newAddress.fulladdress}
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
