import React from 'react';

// Styles
import styles from './Card.module.css';

const Card = ({ value }) => {
  return (
    <div className={styles.card}>
      <p className={styles.card__subtitle}>{value}</p>
    </div>
  );
};

export default Card;
