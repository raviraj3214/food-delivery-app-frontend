import React from 'react'
import styles from './Footer.module.css'
import footerlogo from '../../assets/logo_footer.png'
import apps from '../../assets/apps.png'
import facebook from '../../assets/Facebook.png'
import instagram from '../../assets/Instagram.png'
import snapchat from '../../assets/Snapchat.png'
import tiktok from '../../assets/TikTok.png'

export default function Footer() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.modal1}>
            <img src={footerlogo} alt='logo' className={styles.footerlogo}/>
            <img src={apps} alt='apps' className={styles.app}/>
            <p className={styles.address}>Company # 490039-445, Registered with <br/> House of companies.</p>
        </div>
        <div className={styles.modal2}>
            <h1 className={styles.deals}>Get Exclusive Deals in your Inbox</h1>
            <div className={styles.inputWrapper}>
                <input type="email" placeholder="youremail@gmail.com" className={styles.footerEmail}/>
                <button className={styles.sub}>Subscribe</button>
            </div>
            <p className={styles.policy}>we wont spam, read our <span className={styles.line}>email policy</span></p>
            <img src={facebook} alt='facebook' className={styles.socialmedia}/>
            <img src={instagram} alt='instagram' className={styles.socialmedia}/>
            <img src={snapchat} alt='snapchat' className={styles.socialmedia}/>
            <img src={tiktok} alt='tiktok' className={styles.socialmedia}/>
        </div>
        <div className={styles.modal3}>
            <h1 className={styles.header}>Legal Pages</h1>
            <p className={styles.links}>Terms and conditions</p>
            <p className={styles.links}>Privacy</p>
            <p className={styles.links}>Cookies</p>
            <p className={styles.links}>Modern Slavery Statement</p>
        </div>
        <div className={styles.modal4}>
            <h1 className={styles.header}>Important Links</h1>
            <p className={styles.links}>Get help</p>
            <p className={styles.links}>Add your restaurant</p>
            <p className={styles.links}>Sign up to deliver</p>
            <p className={styles.links}>Create a business account</p>
        </div>
      </div>
      <footer className={styles.footer}>
          <p className={styles.copyright}>Order.uk Copyright 2024, All Rights Reserved.</p>
          <div className={styles.footerRight}>
            <p>Privacy Policy</p>
            <p>Terms</p>
            <p>Pricing</p>
            <p>Do not sell or share my personal information</p>
          </div>
        </footer>
    </div>
  )
}
