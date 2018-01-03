import React, { Component } from 'react';
import uuid4 from 'uuid/v4';
import key from 'keymaster';

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
      nOfCol: 8,
      synth: new Vsynth(data),
      on: true,
      data,
      position: {
        r: -1,
        c: -1,
      },
      mouseDown: false,
      mouseDownPosition: {
        r: -1,
        c: -1,
      },
      mouse: {
        x: 0,
        y: 0,
      },
    };

    this.detectKeyboard = this.detectKeyboard.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    // window.addEventListener('wheel', this.handleWheel);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    this.detectKeyboard();

    const n = this.state.nOfCol;
    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < n; j += 1) {
        this.updateData(i, j, 0);
      }
    }

    this.state.synth.start('+3.0');
  }

  componentWillUnmount() {
    // window.removeEventListener('wheel', this.handleWheel);
  }

  setPosition(r, c) {
    const { mouseDown } = this.state;
    if (!mouseDown) {
      this.setState({
        position: { r, c },
      });
    }
  }

  detectKeyboard() {
    key('space', () => {
      this.triggerSound();
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
    const { data, synth } = this.state;
    if (typeof data[r][c] === 'number') {
      let v = data[r][c] + value;
      v = Math.min(350, Math.max(10, v));
      data[r][c] = v;
      // this.synth.updateValue(r, c, v);
      synth.updateValue(r, c, v);
      this.setState({
        data,
      });
    }
  }

  handleClickButton() {
    this.triggerSound();
  }

  handleMouseDown(e) {
    let { mouseDown, mouseDownPosition } = this.state;
    const { position } = this.state;
    // console.log(`down: ${position.r} ${position.c}`);

    mouseDownPosition = Object.assign({}, position);
    mouseDown = true;

    const mouse = { x: e.clientX, y: e.clientY };
    this.setState({
      mouseDown,
      mouseDownPosition,
      mouse,
    });
  }

  handleMouseUp() {
    let { mouseDownPosition, mouseDown } = this.state;
    mouseDownPosition = { r: -1, c: -1 };
    mouseDown = false;
    this.setState({
      mouseDownPosition,
      mouseDown,
    });
  }

  handleMouseMove(e) {
    const { mouseDown, mouseDownPosition } = this.state;
    const { r, c } = mouseDownPosition;
    if (mouseDown) {
      const mouseOld = this.state.mouse;
      const mouseNew = { x: e.clientX, y: e.clientY };
      const diff = (mouseOld.y - mouseNew.y);
      this.updateData(r, c, diff * 0.8);
      this.setState({
        mouse: mouseNew,
      });
    }
  }

  triggerSound() {
    const { on, synth } = this.state;
    if (on) {
      synth.stop();
    } else {
      synth.start();
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
                    <Button key={uuid4()} on={on} onClick={this.handleClickButton} />
                  ) : (
                    <Knob
                      key={uuid4()}
                      r={r}
                      c={c}
                      onEnter={this.setPosition}
                      onMouseDown={this.handleMouseDown}
                      onWheel={this.handleWheel}
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
