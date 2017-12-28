import { Synth } from 'tone';


export default () => {
	const synth = new Synth().toMaster();
	synth.triggerAttackRelease('C4', '8n');
};
