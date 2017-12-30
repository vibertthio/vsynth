import { Filter, NoiseSynth, Part } from 'tone';

export default class OpenHihat {
	constructor() {
		const lowPass = new Filter({
			frequency: 14000,
		}).toMaster();

		const synth = new NoiseSynth({
			volume: -15,
			filter: {
				Q: 1,
			},
			envelope: {
				attack: 0.01,
				decay: 0.3,
			},
			filterEnvelope: {
				attack: 0.01,
				decay: 0.03,
				baseFrequency: 4000,
				octaves: -2.5,
				exponent: 4,
			},
		}).connect(lowPass);

		const part = new Part(
			(time) => {
				synth.triggerAttack(time);
			},
			['2*16n', '6*8n'],
		);

		this.synth = synth;
		this.lpf = lowPass;
		this.part = part;
	}

	start(time) {
		this.part.start(time);
	}

	trigger(time) {
		this.synth.triggerAttack(time);
	}
}
