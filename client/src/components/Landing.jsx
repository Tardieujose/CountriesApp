import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Your planet is here!</h1>
        <h3 className={styles.text}>
          Would you like to see it? <br /> Come on in...
        </h3>
        <Link to='/countries'>
          <button className={styles.btn}>Let's go!</button>
        </Link>    
      </div>
    </div>
  )
}
