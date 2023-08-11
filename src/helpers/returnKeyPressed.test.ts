import returnKeyPressed from './returnKeyPressed';

describe('returnKeyPressed', () => {
	it('should return false when no event object found', () => {
		expect(returnKeyPressed()).toEqual(false);
	});
	it('should return false when no key property found', () => {
		expect(returnKeyPressed({ keyCode: 1 })).toEqual(false);
	});
	it('should return false when no keyCode property found', () => {
		expect(returnKeyPressed({ key: 'foo' })).toEqual(false);
	});
	it('should return false when key property is not "Enter" and keyCode property is not 13', () => {
		expect(returnKeyPressed({ key: 'foo', keyCode: 1 })).toEqual(false);
	});
	it('should return true when key property is "Enter" and keyCode is not 13', () => {
		expect(returnKeyPressed({ key: 'Enter', keyCode: 1 })).toEqual(true);
	});
	it('should return true when key property is not "Enter" and keyCode property is 13', () => {
		expect(returnKeyPressed({ key: 'Foo', keyCode: 13 })).toEqual(true);
	});
	it('should return true when key property is "Enter" and keyCode property is 13', () => {
		expect(returnKeyPressed({ key: 'Enter', keyCode: 13 })).toEqual(true);
	});
});
