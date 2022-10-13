import React, { useState, useEffect, useRef } from 'react';

// Utils
import { nextFibonacci } from 'utils/functions';

// Components
import Card from 'components/Card';

// Styles
import styles from './Carousel.module.css';

const Carousel = () => {
  const [febonacci, setFebonacci] = useState([1, 1, 2, 3]);
  const [translateValue, setTranslateValue] = useState(0);
  const [translateIncrement, setTranslateIncrement] = useState(100);
  const [itemsPerScreen, setItemsPerScreen] = useState(4);
  const ref = useRef();

  useEffect(() => {
    const handleResize = () => {
      const itemsPerScreen = window
        .getComputedStyle(ref.current)
        .getPropertyValue('--items-per-screen');

      setItemsPerScreen(Number(itemsPerScreen));
      setTranslateIncrement(100 / itemsPerScreen);
      setTranslateValue((translateValue * 100) / itemsPerScreen);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePrev = (e, translateIncrement) => {
    if (translateValue <= 0) return;

    setTranslateValue(translateValue - translateIncrement);
  };

  const handleNext = (e, translateIncrement) => {
    if ((translateValue * itemsPerScreen) / 100 <= febonacci.length) {
      console.log((translateValue * itemsPerScreen) / 100);
      setFebonacci([
        ...febonacci,
        nextFibonacci(febonacci[febonacci.length - 1]),
      ]);
    }
    setTranslateValue(translateValue + translateIncrement);
  };

  return (
    <>
      <div className={styles.row}>
        <div className={styles.header}>
          <h3 className={styles.title}>Fibonacci Carousel</h3>
          <div className={styles.progressBar}></div>
        </div>
      </div>
      <div className={styles.carousel__container}>
        <button
          className={styles.handle}
          onClick={(e) => handlePrev(e, translateIncrement)}
        >
          <div className={styles.text}>&#8249;</div>
        </button>
        <ul
          ref={ref}
          style={{ transform: `translateX(-${translateValue}%)` }}
          className={styles.carousel}
        >
          {febonacci.map((number, index) => (
            <li key={number + index} className={styles.card}>
              <Card value={number} />
            </li>
          ))}
        </ul>
        <button
          className={`${styles.handle} ${styles.rightHandle}`}
          onClick={(e) => handleNext(e, translateIncrement)}
        >
          <div className={styles.text}>&#8250;</div>
        </button>
      </div>
    </>
  );
};

export default Carousel;
