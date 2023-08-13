import media from './media-queries';
describe('media', () => {
	describe('should return expected media query', () => {
		it('for Phone Portrait', () => {
			expect(media.phonePortrait('color: red;')).toEqual(`@media (min-width: 420px) { color: red; }`);
		});
		it('for Phone Landscape', () => {
			expect(media.phoneLandscape('color: red;')).toEqual(`@media (min-width: 650px) { color: red; }`);
		});
		it('for Tablet Portrait', () => {
			expect(media.tabletPortrait('color: red;')).toEqual(`@media (min-width: 768px) { color: red; }`);
		});
		it('for Tablet Landscape', () => {
			expect(media.tabletLandscape('color: red;')).toEqual(`@media (min-width: 1024px) { color: red; }`);
		});
		it('for Desktop', () => {
			expect(media.desktop('color: red;')).toEqual(`@media (min-width: 1200px) { color: red; }`);
		});
	});
});
