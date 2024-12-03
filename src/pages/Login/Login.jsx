import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../../assets/logo.png";
import image from "../../assets/img.png";
import Footer from "../../components/Footer/Footer";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const handleSignUp = () => {
    navigate('/register')
  }

  // const loginUser = async (e) => {
  //   e.preventDefault();
  //   const { email, password } = data;
  //   try {
  //     const { data } = await axios.post("/login", {
  //       email,
  //       password,
  //     });
  //     if (data.error) {
  //       toast.error(data.error);
  //     } else {
  //       setData({});
  //       navigate("/homepage");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
  
    try {
      const { data } = await axios.post("/user/login", { email, password }, {withCredentials: true});
      console.log(data)
      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("token", data.data.token)
        localStorage.setItem("name", data.data.user.name)
        localStorage.setItem("email", data.data.user.email)
        setData({});
        toast.success("Login Successful!");
        navigate("/homepage");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div>
        <div className={styles.container}>
          <div className={styles.left}>
            <form onSubmit={loginUser}>
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
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Example@email.com"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
              <button className={styles.signInBtn} type="submit">
                Sign in
              </button>
              <div className={styles.signUp} onClick={handleSignUp}>
                Don't you have an account? <a>Sign up</a>
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
