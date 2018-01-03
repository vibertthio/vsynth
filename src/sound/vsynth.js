import { Transport } from 'tone';
import Kick from './kick';
import Snare from './snare';
import OpenHihat from './open-hihat';
import ClosedHihat from './closed-hihat';

import lerp from '../utils/lerp';

class Vsynth {
	constructor(data) {
		const values = data.map(r => r.map(d => (d - 10) / 340));

		const kick = new Kick();
		const snare = new Snare();
		const ohh = new OpenHihat();
		const chh = new ClosedHihat();
		kick.start();
		snare.start();
		// ohh.start();
		chh.start();

		// Transport.start();
		Transport.loopStart = 0;
		Transport.loopEnd = '1:0';
		Transport.loop = true;

		// assign attributes
		this.kick = kick;
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
						this.kick.synth.envelope.decay = lerp(0, 1, 0.4, 6.0, v);
						break;
					case 1:
						this.kick.synth.envelope.attack = lerp(0, 1, 0.001, 0.3, v);
						break;
					case 2:
						break;
					case 3:
						break;
					default:
						break;
				}
				break;
			case 1:
				switch (c) {
					case 0:
						this.chh.hpf.frequency.value = lerp(0, 1, 100, 10000, v);
						break;
					case 1:
						this.chh.synth.volume.value = lerp(0, 1, -40, -5, v);
						break;
					case 2:
						this.chh.synth.envelope.attack = lerp(0, 1, 0.005, 0.3, v);
						break;
					case 3:
						this.chh.synth.envelope.decay = lerp(0, 1, 0.01, 0.2, v);
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
