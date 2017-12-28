import React from 'react';
import { render } from 'react-dom';
import styles from './index.module.css';
import particles from './three/particles/';
import sound from './sound';

particles();
sound();

const App = () => (
  <div className={styles.title}>
    <a
      href="https://vibertthio.com/portfolio/"
      target="_blank"
      rel="noreferrer noopener"
      onClick={() => {
				console.log('clicked link');
			}}
    >
			Vibert Thio
    </a>
  </div>
);

render(<App />, document.getElementById('root'));
