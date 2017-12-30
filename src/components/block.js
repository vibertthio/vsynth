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
		const data = Array(n)
			.fill([])
			.map(() => Array(n).fill(10));

		this.number = n;
		this.state = {
			on: true,
			data,
			position: {
				r: -1,
				c: -1,
			},
		};

		this.synth = new Vsynth(this.state.data);
		this.synth.start();

		this.handleClick = this.handleClick.bind(this);
		this.handleWheel = this.handleWheel.bind(this);
		this.setPosition = this.setPosition.bind(this);
		this.updateData = this.updateData.bind(this);
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
		const { position } = this.state;
		const { r, c } = position;
		if (r !== -1 && c !== -1) {
			this.updateData(r, c, e.deltaY * 0.2);
		}
	}

	updateData(r, c, value) {
		const { data } = this.state;
		if (typeof data[r][c] === 'number') {
			let v = data[r][c] + value;
			v = Math.min(350, Math.max(10, v));
			data[r][c] = v;
			this.synth.updateValue(r, c, v);
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
