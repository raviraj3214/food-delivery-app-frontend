import React from "react";
import styles from "./HomePage.module.css";
import logo from "../../assets/logo.png";
import pizzaGirl from "../../assets/pizzaGirl.png";
import girl from "../../assets/girl.png";
import notification1 from "../../assets/noti1.png";
import notification2 from "../../assets/noti2.png";
import notification3 from "../../assets/noti3.png";
import food1 from "../../assets/food1.png";
import food2 from "../../assets/food2.png";
import food3 from "../../assets/food3.png";
import category1 from "../../assets/category1.png";
import category2 from "../../assets/category2.png";
import category3 from "../../assets/category3.png";
import category4 from "../../assets/category4.png";
import category5 from "../../assets/category5.png";
import category6 from "../../assets/category6.png";
import friends from "../../assets/friends.png";
import apps from "../../assets/apps.png";
import delivery1 from "../../assets/delivery1.png";
import delivery2 from "../../assets/delivery2.png";
import order1 from "../../assets/order1.png";
import order2 from "../../assets/order2.png";
import order3 from "../../assets/order3.png";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import Restaurant from "../../components/Restaurants/Restaurant";
import Navbar from "../../components/Navbar/Navbar";
import ban from "../../assets/ban.png";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className={styles.homePage}>
        <div className={styles.heroContainer}>
          <div className={styles.heroLeft}>
            <p className={styles.subtitle}>
              Order Restaurant food, takeaway and groceries.
            </p>
            <h1 className={styles.mainTitle}>
              Feast Your Senses, <br />
              <span className={styles.highlight}>Fast and Fresh</span>
            </h1>
            <p className={styles.text}>
              Enter a postcode to see what we deliver
            </p>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="e.g EC4R 3TE"
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>Search</button>
            </div>
          </div>
          <img src={pizzaGirl} alt="Pizza Girl" className={styles.mainImage} />
          <img src={girl} alt="girl" className={styles.girl} />
          <div className={styles.orderUpdates}>
            <div className={styles.orderCard}>
              <img src={notification1} />
            </div>
            <div className={styles.orderCard}>
              <img src={notification2} />
            </div>
            <div className={styles.orderCard}>
              <img src={notification3} />
            </div>
          </div>
        </div>

        <div className={styles.discount}>
          <p className={styles.exclusive}>
            Up to -40% 🎊 Order.uk exclusive deals
          </p>
          <div className={styles.types}>
            <p className={styles.type}>Vegan</p>
            <p className={styles.type}>Sushi</p>
            <p className={styles.pizza}>Pizza & Fast food</p>
            <p className={styles.type}>others</p>
          </div>
        </div>

        <div className={styles.food}>
          <div className={styles.foodCard}>
            <img className={styles.foodType} src={food1} alt="food" />
            <div className={styles.discountBadge}>-40%</div>
            <div className={styles.foodOverlay}>
              <p>Restaurant</p>
              <h6>Chef Burgers London</h6>
            </div>
          </div>
          <div className={styles.foodCard}>
            <img className={styles.foodType} src={food2} alt="food" />
            <div className={styles.discountBadge}>-20%</div>
            <div className={styles.foodOverlay}>
              <p>Restaurant</p>
              <h6>Grand Ai Cafe London</h6>
            </div>
          </div>
          <div className={styles.foodCard}>
            <img className={styles.foodType} src={food3} alt="food" />
            <div className={styles.discountBadge}>-17%</div>
            <div className={styles.foodOverlay}>
              <p>Restaurant</p>
              <h6>Butterbrot Caf'e London</h6>
            </div>
          </div>
        </div>

        <div className={styles.greyContainer}>
          <div className={styles.orderText}>Order.uk Popular Categories 🤩</div>

          <div className={styles.categoryContainer}>
            <div className={styles.category}>
              <img src={category1} alt="food category" />
              <div className={styles.categoryContent}>
                <div className={styles.categoryTitle}>
                  Burgers &amp; Fast food
                </div>
                <div className={styles.categorySubtitle}>21 Restaurants</div>
              </div>
            </div>
            <div className={styles.category}>
              <img src={category2} alt="food category" />
              <div className={styles.categoryContent}>
                <div className={styles.categoryTitle}>Salads</div>
                <div className={styles.categorySubtitle}>32 Restaurants</div>
              </div>
            </div>
            <div className={styles.category}>
              <img src={category3} alt="food category" />
              <div className={styles.categoryContent}>
                <div className={styles.categoryTitle}>Pasta &amp; Casuals</div>
                <div className={styles.categorySubtitle}>4 Restaurants</div>
              </div>
            </div>
            <div className={styles.category}>
              <img src={category4} alt="food category" />
              <div className={styles.categoryContent}>
                <div className={styles.categoryTitle}>Pizza</div>
                <div className={styles.categorySubtitle}>32 Restaurants</div>
              </div>
            </div>
            <div className={styles.category}>
              <img src={category5} alt="food category" />
              <div className={styles.categoryContent}>
                <div className={styles.categoryTitle}>
                  Breakfast &amp; Fast food
                </div>
                <div className={styles.categorySubtitle}>4 Restaurants</div>
              </div>
            </div>
            <div className={styles.category}>
              <img src={category6} alt="food category" />
              <div className={styles.categoryContent}>
                <div className={styles.categoryTitle}>Soups</div>
                <div className={styles.categorySubtitle}>32 Restaurants</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.popular}>Popular Restaurants</div>

        <Restaurant />

        {/* <div className={styles.banner}>
        <img src={friends} alt="friends" className={styles.frnd} />
        <img src={logo} alt="logo" className={styles.bannerLogo} />
        <span>ing is more</span>
        <p>Personalised & instant</p>
        <p>Download the Order.uk app for faster ordering</p>
        <img src={apps} alt="app" className={styles.bannerApp} />
      </div> */}
        <div className={styles.banner}>
          <div className={styles.leftSection}>
            <img src={friends} alt="Friends" className={styles.friendsImage} />
          </div>
          <div className={styles.centerSection}>
            <img src={logo} alt="Logo" className={styles.logoImage} />
            <span className={styles.orderingText}>Ordering is more</span>
            <p className={styles.personalisedText}>Personalised & Instant</p>
            <p className={styles.downloadText}>
              Download the Order.uk app for faster ordering
            </p>
          </div>
          <div className={styles.rightSection}>
            <img src={apps} alt="App Store" className={styles.appsImage} />
          </div>
        </div>
        {/* <div className={styles.banner}>
      <img src={ban}/>
    </div> */}

        <div className={styles.delivery}>
          <img src={delivery1} alt="delivery" />
          <img src={delivery2} alt="delivery" />
        </div>

        <div className={styles.about}>
          <div className={styles.more}>
            <h2>Know more about us!</h2>
            <div className={styles.moreModal}>
              <p className={styles.question}>Frequent Questions</p>
              <p>Who we are</p>
              <p>Partner Program</p>
              <p>Help & Support</p>
            </div>
          </div>
          <div className={styles.aboutModal}>
            <div className={styles.left}>
              <h2>How does Order.UK work?</h2>
              <p>What payment methods are accepted?</p>
              <p>Can I track my order in real-time?</p>
              <p>
                Are there any special discounts or <br /> promotions available?
              </p>
              <p>Is Order.UK available in my area?</p>
            </div>

            <div className={styles.right}>
              <div className={styles.modals}>
                <div className={styles.aboutModal2}>
                  <div className={styles.placeOrder}>
                    <p className={styles.heading}>Place an Order</p>
                    <img src={order2} alt="food" />
                    <p>Place order through our website or Mobile app</p>
                  </div>
                </div>
                <div className={styles.aboutModal3}>
                  <div className={styles.trackProgress}>
                    <p className={styles.heading}>Track Progress</p>
                    <img src={order1} alt="food" />
                    <p>Your can track your order status with delivery time</p>
                  </div>
                </div>
                <div className={styles.aboutModal4}>
                  <div className={styles.getOrder}>
                    <p className={styles.heading}>Get your Order</p>
                    <img src={order3} alt="food" />
                    <p>Receive your order at a lighting fast speed!</p>
                  </div>
                </div>
              </div>
              <p className={styles.foot}>
                Order.UK simplifies the food ordering process. Browse through
                our diverse menu,
                <br /> select your favorite dishes, and proceed to checkout.
                Your delicious meal will be
                <br /> on its way to your doorstep in no time!
              </p>
            </div>
          </div>
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            546+<span>Registered Riders</span>
          </div>
          <div className={styles.statItem}>
            789,900+<span>Orders Delivered</span>
          </div>
          <div className={styles.statItem}>
            690+<span>Restaurants Partnered</span>
          </div>
          <div className={styles.statItem}>
            17,457+<span>Food Items</span>
          </div>
        </div>
        <Footer className={styles.footing} />
      </div>
    </div>
  );
}
