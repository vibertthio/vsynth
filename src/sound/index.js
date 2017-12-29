import { MonoSynth, Sequence, Transport } from 'tone';

export default () => {
	// const scale = ['C4', 'G4', 'E4', 'B4', 'C4', 'F4', 'D4'];
	const synth = new MonoSynth({
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
	// synth.triggerAttackRelease('C4', '8n');

	const loop = new Sequence(
		(time, note) => {
			// const note = scale[col];
			synth.triggerAttackRelease(note, '16n');
		},
		['C4', 'E4', 'C4', 'D4'],
		'4n',
	);

	Transport.bpm.rampTo(180, 1);
	Transport.start();
	loop.start();
};
