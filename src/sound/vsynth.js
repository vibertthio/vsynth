import { Transport } from 'tone';
import Kick from './kick';
import OpenHihat from './open-hihat';
import ClosedHihat from './closed-hihat';

class Vsynth {
	constructor(data) {
		const values = data.map(r => r.map(d => (d - 10) / 340));

		const kick = new Kick();
		const ohh = new OpenHihat();
		const chh = new ClosedHihat();
		kick.start();
		ohh.start();
		chh.start();

		// Transport.start();
		Transport.loopStart = 0;
		Transport.loopEnd = '1:0';
		Transport.loop = true;
		Transport.start();

		// assign attributes
		this.values = values;
		this.chh = chh;
		this.ohh = ohh;
		this.transport = Transport;
	}

	start() {
		this.transport.start('+0.1');
	}

	stop() {
		this.transport.stop();
	}

	updateValue(r, c, vi) {
		const v = (vi - 10) / 340;
		this.values[r][c] = v;

		switch (r) {
			case 0:
				switch (c) {
					case 0:
						// this.monoSynth.envelope.attack = lerp(0, 1, 0.005, 1.5, v);
						break;
					case 1:
						// this.monoSynth.envelope.decay = lerp(0, 1, 0.2, 0.005, v);
						break;
					case 2:
						// this.hpf.frequency.value = lerp(0, 1, 100, 2000, v);
						break;
					case 3:
						// this.lpf.frequency.value = lerp(0, 1, 2000, 50, v);
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
