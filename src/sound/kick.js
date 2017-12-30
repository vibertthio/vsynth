import { Filter, MembraneSynth, Part } from 'tone';

export default class Kick {
	constructor() {
		// const lowPass = new Filter({
		// 	frequency: 14000,
		// }).toMaster();

		const synth = new MembraneSynth({
			pitchDecay: 0.05,
			octaves: 10,
			oscillator: {
				type: 'sine',
			},
			envelope: {
				attack: 0.001,
				decay: 0.8,
				sustain: 0.01,
				release: 0.5,
				attackCurve: 'exponential',
			},
		}).toMaster();

		const part = new Part(
			(time) => {
				this.synth.triggerAttackRelease('D1', time);
			},
			['0:0', '0:1', '0:2', '0:3'],
		);
		this.synth = synth;
		this.part = part;
	}

	start(time) {
		this.part.start(time);
	}
}
