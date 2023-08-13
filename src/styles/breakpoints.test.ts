import breakpoints from './breakpoints';
describe('breakpoints', () => {
	it('should return expected values', () => {
		expect(breakpoints).toEqual({
			'phone-p': 420,
			'phone-l': 650,
			'tablet-p': 768,
			'tablet-l': 1024,
			desktop: 1200,
		});
	});
});
