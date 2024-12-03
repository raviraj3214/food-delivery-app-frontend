import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ProductPage.module.css";
import bg from "../../assets/bg.png";
import burger from "../../assets/burger.png";
import rating from "../../assets/rating.png";
import { GoChecklist } from "react-icons/go";
import { IoBicycle } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import vegan1 from "../../assets/vegan1.png";
import vegan2 from "../../assets/vegan2.png";
import vegan3 from "../../assets/vegan3.png";
import tracking from "../../assets/Tracking.png";
import clock from "../../assets/Clock.png";
import idVerified from "../../assets/ID_Verified.png";
import CustomMap from "../../components/Map/Map";
import reviews from "../../assets/reviews.png";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Restaurant from "../../components/Restaurants/Restaurant";
import Footer from "../../components/Footer/Footer";
import Cart from "../../components/Cart/Cart";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducer/cart";

export default function ProductPage() {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [categories,setCategories] =useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const {id} = useParams()
  const dispatch = useDispatch();
  
  const handleAddToCart = (product) => {
    console.log("product",product)
    dispatch(addToCart(product));
    setIsCartVisible(true);
  };


  // const handleAddToCart = () => {
  //   setIsCartVisible(true);
  // };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); 
        const response = await axios.get(`/fooditem/${id}`); 
        const data = response.data.data || [];
        const categories = response.data.categories || [];
        const groupedProducts = categories.reduce((acc, category) => {
          acc[category] = data.filter(
            (item) => item.category.name === category
          );
          return acc;
        }, {});

        setProductsByCategory(groupedProducts);
        setCategories(categories);
        setLoading(false); 
      } catch (err) {
        setError(err.message || "Failed to fetch products"); 
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [id]);

  const reviewImages = [reviews, reviews, reviews, reviews, reviews, reviews];

  const showNextReview = () => {
    if (currentIndex < reviewImages.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // const handleRemoveToCart = (product) => {
  //   const existingProduct = cartItems.find((item) => item.id === product.id);
  
  //   if (existingProduct) {
  //     if (existingProduct.quantity > 1) {
  //       setCartItems(
  //         cartItems.map((item) =>
  //           item.id === product.id
  //             ? { ...item, quantity: item.quantity - 1 }
  //             : item
  //         )
  //       );
  //     } else {
  //       setCartItems(cartItems.filter((item) => item.id !== product.id));
  //     }
  //   }
  // };
  

  const showPrevReview = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const showNext = () => {
    if (currentIndex < products.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const showPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // const handleAddToCart = (product) => {
  //   const existingProduct = cartItems.find((item) => item.id === product.id);
  //   if (existingProduct) {
  //     setCartItems(
  //       cartItems.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       )
  //     );
  //   } else {
  //     setCartItems([...cartItems, { ...product, quantity: 1 }]);
  //   }
  //   setIsCartVisible(true);
  // };

  // Toggle cart visibility
  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  }


  return (
    <div className={styles.products}>
      <Navbar />

      <div className={styles.heroModal}>
        <img src={bg} alt="background" className={styles.bg} />
        <div className={styles.textContent}>
          <p>I'm lovin' it!</p>
          <h1>McDonald's East London</h1>
          <div className={styles.infoButtons}>
            <div className={styles.heroButton}>Minimum Order: 12 GBP</div>
            <div className={styles.heroButton}>Delivery in 20-25 Minutes</div>
          </div>
        </div>
        <div className={styles.imageContent}>
          <img alt="burger" src={burger} />
          <div className={styles.heroRating}>
            <img src={rating} alt="ratings" />
          </div>
        </div>
        <div className={styles.openStatus}>Open until 3:00 AM</div>
      </div>

      <div className={styles.london}>
        <h1>All Offers from McDonald’s East London</h1>
        <div className={styles.londonText}>
          <div className={styles.londonWrapper}>
            <IoIosSearch className={styles.searchIcon} />
            <input
              placeholder="Search from menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.orbitModal}>
        <p className={styles.offer}>Offers</p>
        <p>Burgers</p>
        <p>Fries</p>
        <p>Snacks</p>
        <p>Cold drinks</p>
        <p>Happy Meal®</p>
        <p>Desserts</p>
        <p>Hot drinks</p>
        <p>Sauces</p>
        <p>Orbit®</p>

        {isCartVisible && (
          <div className={styles.productCart}>
            <Cart toggleCartVisibility={toggleCartVisibility} />
          
          </div>
        )}
        
      </div>

      {/* {isCartVisible && (
            <div className={styles.productCart}>
              <Cart />

            </div>
          )} */}

      <div className={styles.containerCart}>
        <div className={styles.discountModal} style={{
          display: 'grid',
          gridTemplateColumns: isCartVisible ? '450px 450px' : 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '50px',
        }}>
          <img src={vegan1} alt="first order discount" />
          <img src={vegan2} alt="Vegan Discount" />
          <img src={vegan3} alt="free ice-cream offer" />
        </div>
        {categories.map((category) => (
          <>
        <div key={category} className={styles.burgerText}>{category}</div>
        <div>
          <div className={styles.grid} style={{
          display: 'grid',
          gridTemplateColumns: isCartVisible ? '400px 400px' : 'auto auto auto',
        }}>
            {productsByCategory[category]?.map((product, index) => (
              <div key={index} className={styles.gridModal}>
                <div className={styles.gridContent}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className={styles.gridPrice}>₹ {product.price}</div>
                </div>
                <div className={styles.gridImage}>
                  <img src={product.image} alt={product.name} />
                  <button
                    className={styles.gridAddButton}
                    onClick={() => handleAddToCart(product)}

                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
      ))}
      </div>

      

      <div className={styles.infoModal}>
        <div className={styles.deliveryInfo}>
          <h1>
            <img src={tracking} />
            Delivery information
          </h1>
          <p>
            <span>Monday:</span> 12:00 AM–3:00 AM, 8:00 AM–3:00 AM
          </p>
          <p>
            <span>Tuesday:</span> 8:00 AM–3:00 AM
          </p>
          <p>
            <span>Wednesday:</span> 8:00 AM–3:00 AM
          </p>
          <p>
            <span>Thursday:</span> 8:00 AM–3:00 AM
          </p>
          <p>
            <span>Friday:</span> 8:00 AM–3:00 AM
          </p>
          <p>
            <span>Saturday:</span> 8:00 AM–3:00 AM
          </p>
          <p>
            <span>Sunday:</span> 8:00 AM–12:00 AM
          </p>
          <p>
            <span>Estimated time until delivery:</span> 20 min
          </p>
        </div>
        <div className={styles.contactInfo}>
          <h1>
            <img src={idVerified} />
            Contact information
          </h1>
          <p className={styles.para}>
            If you have allergies or other dietary <br /> restrictions, please
            contact the restaurant. The <br /> restaurant will provide
            food-specific <br /> information upon request.
          </p>
          <div>
            <p>
              <span>Phone number</span>
            </p>
            <p>+934443-43</p>
            <p>
              <span>Website</span>
            </p>
            <p>
              <a href="http://mcdonalds.uk/">http://mcdonalds.uk/</a>
            </p>
          </div>
        </div>
        <div className={styles.operationInfo}>
          <h1>
            <img src={clock} />
            Operational Times
          </h1>
          <p>
            <span>Monday:</span> 8:00 AM–3:00 AM
          </p>
          <p>
            <span>Tuesday:</span> 8:00 AM–3:00 AM
          </p>
          <p>
            <span>Wednesday:</span> 8:00 AM–3:00 AM
          </p>
          <p>
            <span>Thursday:</span> 8:00 AM–3:00 AM
          </p>
          <p>
            <span>Friday:</span> 8:00 AM–3:00 AM
          </p>
          <p>
            <span>Saturday:</span> 8:00 AM–3:00 AM
          </p>
          <p>
            <span>Sunday:</span> 8:00 AM–3:00 AM
          </p>
        </div>
      </div>

      <div className={styles.map}>
        <CustomMap />
      </div>

      <div className={styles.customerReviewModal}>
        <div className={styles.reviewText}>
          <h1>Customer Reviews</h1>
          <div className={styles.leftRight}>
            <IoIosArrowDropleftCircle
              onClick={showPrev}
              style={{ cursor: "pointer" }}
            />
            <IoIosArrowDroprightCircle
              onClick={showNext}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        <div className={styles.reviewModal}>
          {reviewImages
            .slice(currentIndex, currentIndex + 3)
            .map((image, index) => (
              <img key={index} src={image} alt={`Review ${index}`} />
            ))}
        </div>
        <img src={rating} alt="Rating" className={styles.ratingImage} />
      </div>

      <div className={styles.similarRestro}>
        <h1>Similar Restaurants</h1>
        <Restaurant />
      </div>

      <div className={styles.footerModal}>
        <Footer />
      </div>
    </div>
  );
}
