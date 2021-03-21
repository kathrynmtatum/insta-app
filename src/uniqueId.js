function sleep(milliseconds) {
	const start = new Date().getTime();
	for (let i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

export default function uniqueId(prefix) { 
	const id = new Date().valueOf().toString(36);
	sleep(1);
	return prefix + id;
};