/* global describe, it */

(function () {
    'use strict';

describe('List Testing', function () {

	it('should be an array', function () {
		expect(characters).to.be.an('array');
	});

	it('should have objects for array items', function () {
		expect(characters[0]).to.be.an('object');
	});

	it('should have name and health properties for each object', function () {
		expect(characters[0]).to.have.keys(['name','health']);

	});
});

describe('Character Testing', function() {
	describe('Instance Tests', function () {

    beforeEach(function() {
      this.goodGuy = new Character();
    });

    it('should exist', function() {

			expect(this.goodGuy).to.be.ok;
		});

    it('should have the type "Character"', function() {

      expect(this.goodGuy).to.be.an.instanceof(Character);

    });

		it('should have a name property', function() {

      expect(this.goodGuy.name).to.be.ok;
		});

		it('should have a health property', function () {

			expect(this.goodGuy.health).to.be.ok;
		});

		it('should have a type property', function () {
			expect().to.be('');
		});
	});

	describe('Attack Function Testing', function (){
		it('should have an attack function', function(){
			expect().to.be('');
		});

		it('should decrease the health level of the targe', function (){
			expect().to.be('');
		});

		it('should not let the health level go below 0', function (){
			expect().to.be('');
		});

		it('should be triggered to respond when health is 0', function(){
			expect().to.be('');
		});
	});
});

})();
