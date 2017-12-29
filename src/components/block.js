import React, { Component } from 'react';
import uuid4 from 'uuid/v4';
import Knob from './knob';
import styles from './block.module.scss';

class Block extends Component {
	constructor() {
		super();
		const n = 8;
		// const data = Array(n).fill(Array(n).fill(0));
		const data = [];
		for (let i = 0; i < n; i += 1) {
			data[i] = [];
			for (let j = 0; j < n; j += 1) {
				data[i][j] = 0;
			}
		}
		this.state = {
			position: {
				r: -1,
				c: -1,
			},
			data,
		};

		this.handleWheel = this.handleWheel.bind(this);
		this.setPosition = this.setPosition.bind(this);
	}

	componentDidMount() {
		window.addEventListener('wheel', this.handleWheel);
	}

	componentWillUnmount() {
		window.removeEventListener('wheel', this.handleWheel);
	}

	setPosition(r, c) {
		this.setState({
			position: { r, c },
		});
		console.log(`pos: ${r}, ${c}`);
	}

	handleWheel(e) {
		const { position, data } = this.state;
		const { r, c } = position;
		if (r !== -1 && c !== -1) {
			data[r][c] += e.deltaY;
			this.setState({
				data,
			});
		}
	}

	render() {
		const { position, data } = this.state;
		return (
  <div className={styles.container}>
    <div className={styles.table}>
      {data.map((row, r) => (
        <div key={uuid4()} className={`${styles.row}`}>
          {row.map((d, c) => (
            <Knob
              key={uuid4()}
              r={r}
              c={c}
              onEnter={this.setPosition}
              value={d}
              active={(r === position.r) && (c === position.c)}
            />
							))}
        </div>
					))}
    </div>
  </div>
		);
	}
}

export default Block;
