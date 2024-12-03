import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import logo from "../../assets/logo.png";
import image from "../../assets/img.png";
import Footer from "../../components/Footer/Footer";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  })

  const handleSignIn = () => {
    navigate('/login')
  }
  

  const registerUser = async (e) => {
    e.preventDefault()
    const { name, phoneNumber, email, password } = data;
    try {
      const { data } = await axios.post("/user/register", {
        name,
        phoneNumber,
        email,
        password,
      }, {withCredentials: true});
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.left}>
          <form onSubmit={registerUser}>
            <img src={logo} alt="logo" className={styles.logo} />
            <div className={styles.welcome}>
              Welcome Back <span>👋</span>
            </div>
            <div className={styles.description}>
              Today is a new day. It's your day. You shape it.
              <br />
              Sign in to start ordering.
            </div>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input
                type="text"
                placeholder="eg. John A"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <label>Phone Number</label>
              <input
                type="number"
                placeholder="Enter your 10 digit phone number"
                value={data.phone}
                onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="Example@email.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="At least 8 characters"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <button className={styles.signUpBtn} type="submit">
                Continue
              </button>
            </div>

            <div className={styles.signIn} onClick={handleSignIn}>
              Don't you have an account? <a>Sign In</a>
            </div>
          </form>
        </div>
        <div className={styles.right}>
          <img src={image} alt="Decorative" className={styles.image} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

{
  /* <form onSubmit={registerUser}>
        <label>Name</label>
        <input type="text" placeholder="Enter your name" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
        <label>Email</label>
        <input type="email" placeholder="Example@email.com" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
        <label>Password</label>
        <input type="password" placeholder="At least 8 characters" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
        <button type="submit">Sign up</button>
      </form> */
}
