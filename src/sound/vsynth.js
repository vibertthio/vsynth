import { MonoSynth, Sequence, Transport } from 'tone';
import * as Key from 'tonal-key';

class Vsynth {
	constructor() {
		this.synth = new MonoSynth({
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
		}).toMaster();

		this.scale = Key.scale('E mixolydian').map(n => n.concat('4'));
		this.notes = [];

		for (let i = 0; i < 16; i += 1) {
			const id = Math.floor(Math.random() * this.scale.length);
			this.notes[i] = this.scale[id];
		}

		this.sequencer = new Sequence(
			(time, col) => {
				const note = this.notes[col % this.notes.length];
				this.synth.triggerAttackRelease(note, '32n', time);
			},
			Array.from(Array(16).keys()),
			'16n',
		);
		Transport.start();
	}

	start() {
		this.sequencer.start();
	}

	stop() {
		this.sequencer.stop();
	}
}

export default Vsynth;
