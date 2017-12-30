import { Filter, Frequency, NoiseSynth, Part, Synth, PolySynth } from 'tone';

export default class Snare {
	constructor() {
		const lowPass = new Filter({
			frequency: 11000,
		}).toMaster();

		const noise = new NoiseSynth({
			volume: -10,
			noise: {
				type: 'pink',
				playbackRate: 3,
			},
			envelope: {
				attack: 0.001,
				decay: 0.15,
				sustain: 0,
				release: 0.05,
			},
		}).connect(lowPass);

		const poly = new PolySynth(6, Synth, {
			volume: -10,
			oscillator: {
				partials: [0, 2, 3, 4],
			},
			envelope: {
				attack: 0.001,
				decay: 0.17,
				sustain: 0,
				release: 0.05,
			},
		}).toMaster();

		const part = new Part(
			(time) => {
				const notes = ['C2', 'D#2', 'A2'];
				poly.voices.forEach((v, i) => {
					v.oscillator.frequency.setValueAtTime(Frequency(notes[i]) * 10, time);
					v.oscillator.frequency.exponentialRampToValueAtTime(notes[i], time + 0.04);
					v.envelope.triggerAttackRelease('16n', time);
				});
				// poly.triggerAttackRelease(['C4', 'D#4', 'G4'], time);
				noise.triggerAttackRelease('16n', time);
			},
			['0:1', '0:3'],
		);

		this.noise = noise;
		this.poly = poly;
		this.lpf = lowPass;
		this.part = part;
	}

	start(time) {
		this.part.start(time);
	}

	trigger(time) {
		this.noise.triggerAttack(time);
		this.poly.triggerAttackRelease(['Eb3', 'G4', 'C5'], '16n', time);
	}
}
