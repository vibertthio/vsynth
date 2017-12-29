import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './index.scss';
import styles from './index.module.scss';
import Block from './components/block';
// import particles from './three/particles/';
// particles();

injectTapEventPlugin();

const App = () => (
  <div>
    <div className={styles.main}>
      <Block />
    </div>
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
  </div>
);

render(<App />, document.getElementById('root'));
