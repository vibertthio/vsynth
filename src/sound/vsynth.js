import { MonoSynth, Synth, Sequence, Transport, Freeverb, Filter, Panner } from 'tone';
import * as Key from 'tonal-key';

function lerp(low, high, from, to, v) {
	const ratio = (v - low) / (high - low);
	return from + (to - from) * ratio;
}

class Vsynth {
	constructor(data) {
		this.values = data.map(r => r.map(d => (d - 10) / 340));
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
		this.monoSynth = new MonoSynth({
			portamento: 0.01,
			oscillator: {
				type: 'square',
			},
			envelope: {
				attack: 0.005,
				decay: 0.2,
				sustain: 0.4,
				release: 1.4,
			},
			filterEnvelope: {
				attack: 0.005,
				decay: 0.1,
				sustain: 0.05,
				release: 0.8,
				baseFrequency: 300,
				octaves: 4,
			},
		});
		this.freeverb = new Freeverb();
		this.hpf = new Filter(100, 'highpass');
		this.lpf = new Filter(2000, 'lowpass');
		this.pan = new Panner(0.5);

		this.monoSynth.connect(this.hpf);
		this.hpf.connect(this.lpf);
		this.lpf.toMaster();
		// this.lpf.connect(this.freeverb);
		// this.freeverb.connect(this.pan);
		// this.pan.toMaster();

		// scale
		this.scale = Key.scale('E mixolydian').map(n => n.concat('4'));
		this.notes = [];
		for (let i = 0; i < 16; i += 1) {
			const id = Math.floor(Math.random() * this.scale.length);
			this.notes[i] = this.scale[id];
		}

		this.sequencer = new Sequence(
			(time, col) => {
				const note = this.notes[col % this.notes.length];
				this.monoSynth.triggerAttackRelease(note, '16n', time);
			},
			Array.from(Array(16).keys()),
			'8n',
		);
		Transport.start();
	}

	start() {
		this.sequencer.start();
	}

	stop() {
		this.sequencer.stop();
	}

	updateValue(r, c, vi) {
		const v = (vi - 10) / 340;
		this.values[r][c] = v;

		switch (r) {
			case 0:
				switch (c) {
					case 0:
						this.monoSynth.envelope.attack = lerp(0, 1, 0.005, 1.5, v);
						break;
					case 1:
						this.monoSynth.envelope.decay = lerp(0, 1, 0.2, 0.005, v);
						break;
					case 2:
						this.hpf.frequency.linearRampTo(lerp(0, 1, 100, 2000, v), 0.05);
						break;
					case 3:
						this.lpf.frequency.linearRampTo(lerp(0, 1, 2000, 50, v), 0.05);
						break;
					default:
						break;
				}
				break;
			default:
				break;
		}
	}
}

export default Vsynth;
