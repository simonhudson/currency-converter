const debounce = (func: { (): void; apply?: any }) => {
	const wait = 250;
	let timeout: string | number | NodeJS.Timeout | null | undefined;
	return function () {
		const context = this;
		const args = arguments;

		const later = () => {
			timeout = null;
		};
		const callNow = !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export default debounce;
