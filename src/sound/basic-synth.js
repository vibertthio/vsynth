import { Synth, Freeverb, Filter, Panner } from 'tone';
import * as Key from 'tonal-key';

export default class BasicSynth {
  constructor() {
    this.synth = new Synth({
      oscillator: {
        type: 'fatsawtooth',
        detune: 0,
        count: 2,
      },
      envelope: {
        attack: 0.02,
        decay: 0.3,
        sustain: 0,
        release: 0.2,
      },
    });
    this.freeverb = new Freeverb();
    this.hpf = new Filter(100, 'highpass');
    this.lpf = new Filter(2000, 'lowpass');
    this.pan = new Panner(0.5);

    this.monoSynth.connect(this.hpf);
    this.hpf.connect(this.lpf);
    this.lpf.toMaster();
    this.lpf.connect(this.freeverb);
    this.freeverb.connect(this.pan);
    this.pan.toMaster();

    this.scale = Key.scale('E mixolydian').map(n => n.concat('4'));
    this.notes = [];
    for (let i = 0; i < 8; i += 1) {
      const id = Math.floor(Math.random() * this.scale.length);
      this.notes[i] = this.scale[id];
    }
  }
}
