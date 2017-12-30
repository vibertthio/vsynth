import React from 'react';
import styles from './knob.module.scss';

export default (props) => {
	const {
 onEnter, r, c, value, active,
} = props;

	const style = {
		transform: `rotate(${value}deg)`,
	};

	return (
  <button
    className={`${styles.module}`}
    onMouseEnter={() => {
				onEnter(r, c);
			}}
    onMouseLeave={() => {
				onEnter(-1, -1);
			}}
		>
    <div className={`${styles.knob} ${active ? (styles.active) : ''}`}>
      <span className={styles.dot} style={style} />
    </div>
  </button>
	);
};