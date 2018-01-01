import { Filter, NoiseSynth, Part, Time } from 'tone';

export default class ClosedHihat {
	constructor() {
		const lowPass = new Filter({
			type: 'lowpass',
			frequency: 10000,
		}).toMaster();

		const synth = new NoiseSynth({
			volume: -17,
			filter: {
				Q: 1,
			},
			envelope: {
				attack: 0.005,
				decay: 0.04,
			},
			filterEnvelope: {
				attack: 0.01,
				decay: 0.02,
				baseFrequency: 4000,
				octaves: -2.5,
				exponent: 4,
			},
		}).connect(lowPass);

		const part = new Part(
			(time) => {
				this.trigger(time);
			},
			// ['0*8n', '1*16n', '1*8n', '3*8n', '4*8n', '5*8n', '7*8n', '8*8n'],
			// ['0:0', '0:1', '0:2', '0:3'],
			[
				'0:0:0',
				'0:0:1',
				'0:0:2',
				'0:0:3',
				'0:1:0',
				'0:1:1',
				'0:1:2',
				'0:1:3',
				'0:2:0',
				'0:2:1',
				'0:2:2',
				'0:2:3',
				'0:3:0',
				'0:3:1',
				'0:3:2',
				'0:3:3',
				Time('0:3:3') + Time('32n'),
			],
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
