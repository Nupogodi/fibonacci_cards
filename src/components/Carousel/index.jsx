import React, { useState } from 'react';

import styles from './Carousel.module.css';

const dummyData = [1, 2, 3, 4, 5, 6, 7, 8];

const Carousel = () => {
  return (
    <>
      <ul className={styles.carousel}>
        {dummyData.map((number) => (
          <li key={number} className={styles.card}>
            <p className={styles.card__subtitle}>{number}</p>
          </li>
        ))}
      </ul>
      <div className={styles.controls}>
        <button className={styles.control__btn}>Prev</button>
        <button className={styles.control__btn}>Next</button>
      </div>
    </>
  );
};

export default Carousel;
