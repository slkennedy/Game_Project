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
		expect(characters[0]).to.contain.keys(['name','health']);

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

		it('should have an evil property', function () {

			expect(this.goodGuy.evil).to.exist;
		});
	});

  describe('Instance Tests of specific character types', function() {

    it('should have an evil bad guy', function() {

      var badGuy = new Character(characters[1]);

      expect(badGuy.evil).to.not.be.false;
    });

    it('should have a not evil good guy', function() {

      var goodGuy = new Character(characters[0]);
      expect(goodGuy.evil).to.be.true;

    });
  });

	describe('Attack Function Testing', function (){
		it('should have an attack function', function(){

			beforeEach(function() {
		      this.goodGuy = new Character(goodCharacters[0]);
		    });

		      badGuy = new Character(badCharacters[0]);


			expect(this.goodGuy.attack).to.be.ok;
			expect(badGuy.attack).to.be.ok;
		});

		it('should decrease the health level of the attacked', function (){
			
			badGuy = new Character(badCharacters[0]);


			expect(this.goodGuy.health).to.equal(100);

			badGuy.attack(this.goodGuy);

			expect(this.goodGuy.health).to.be.below(100);

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
