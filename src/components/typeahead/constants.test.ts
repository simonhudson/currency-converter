import * as constants from './constants';

describe('constants', () => {
	it('should return expected values', () => {
		expect(constants).toEqual({
			NO_RESULTS_STRING: 'No results found',
		});
	});
});
