import React, { useState, useEffect, useRef } from 'react';
import Card from 'components/Card';

import styles from './Carousel.module.css';

const dummyData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Carousel = () => {
  const [translateValue, setTranslateValue] = useState(0);
  const [translateIncrement, setTranslateIncrement] = useState(100);
  const ref = useRef();

  useEffect(() => {
    const handleResize = () => {
      const itemsPerScreen = window
        .getComputedStyle(ref.current)
        .getPropertyValue('--items-per-screen');

      setTranslateIncrement(100 / itemsPerScreen);
      setTranslateValue((translateValue * 100) / itemsPerScreen);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTranslateChange = (e, translateIncrement) => {
    if (translateValue <= 0 && Math.sign(translateIncrement) === -1) {
      return;
    }
    setTranslateValue(translateValue + translateIncrement);
  };

  return (
    <>
      <div className={styles.row}>
        <div className={styles.header}>
          <h3 className={styles.title}>Title</h3>
          <div className={styles.progressBar}></div>
        </div>
      </div>
      <div className={styles.carousel__container}>
        <button
          className={`${styles.handle} ${styles.leftHandle}`}
          onClick={(e) => handleTranslateChange(e, -translateIncrement)}
        >
          <div className={styles.text}>&#8249;</div>
        </button>
        <ul
          ref={ref}
          style={{ transform: `translateX(-${translateValue}%)` }}
          className={styles.carousel}
        >
          {dummyData.map((number) => (
            <li key={number} className={styles.card}>
              <Card value={number} />
            </li>
          ))}
        </ul>
        <button
          className={`${styles.handle} ${styles.rightHandle}`}
          onClick={(e) => handleTranslateChange(e, translateIncrement)}
        >
          <div className={styles.text}>&#8250;</div>
        </button>
      </div>
    </>
  );
};

export default Carousel;
