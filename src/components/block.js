import React, { Component } from 'react';
import uuid4 from 'uuid/v4';
import Knob from './knob';
import Button from './button';
import styles from './block.module.scss';
import Vsynth from '../sound/vsynth';


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
		this.number = n;
		this.state = {
			on: false,
			data,
			position: {
				r: -1,
				c: -1,
			},
		};

		this.synth = new Vsynth();
		this.handleClick = this.handleClick.bind(this);
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

	handleClick() {
		const { on } = this.state;
		if (on) {
			this.synth.stop();
		} else {
			this.synth.start();
		}
		this.setState({
			on: !on,
		});
	}

	render() {
		const n = this.number;
		const { on, position, data } = this.state;
		return (
  <div className={styles.container}>
    <div className={styles.table}>
      {data.map((row, r) => (
        <div key={uuid4()} className={`${styles.row}`}>
          {row.map((d, c) =>
									(r === n - 1 && c === n - 1 ? (
  <Button key={uuid4()} on={on} onClick={this.handleClick} />
									) : (
  <Knob
    key={uuid4()}
    r={r}
    c={c}
    onEnter={this.setPosition}
    value={d}
    active={r === position.r && c === position.c}
  />
									)))}
        </div>
					))}
    </div>
  </div>
		);
	}
}

export default Block;
