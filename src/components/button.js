import React from 'react';
import styles from './button.module.scss';

export default (props) => {
	const { on, onClick } = props;

	return (
  <div className={styles.module}>
    <div className={`${styles.container}`}>
      <button className={`${styles.button} ${on ? styles.on : ''}`} onClick={onClick} />
    </div>
  </div>
	);
};
