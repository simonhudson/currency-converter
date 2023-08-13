const debounce = (func: { (): void; apply?: any }, wait?: number) => {
	wait = wait || 250;
	let timeout: number | NodeJS.Timeout | undefined;
	return function () {
		const context = this;
		const args = arguments;

		const later = () => {
			timeout = undefined;
		};
		const callNow = !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export default debounce;
