var characters = [{name:'sara', health:100, evil:false}, {name:'ollie-berry', health:100, evil:true}];
var goodCharacters = _.filter(characters, function(character) {
  return character.evil === false;
});
var badCharacters = _.filter(characters, function(character) {
  return character.evil === true;
});
var goodGuy;
var badGuy;

function reusableTemplate(templateId, container, model) {
    var templateFunction = _.template($('#' + templateId).text());
    var renderedTemplate = templateFunction(model);
    $(container).append(renderedTemplate);
}

_.each(goodCharacters, function(output){
	reusableTemplate('templates-character-list', '.dropdown', output);
});

function Character(characterSelection) {
  characterModel = characterSelection || {};
  this.name = (characterModel.name) ? characterModel.name : 'No Name';
  this.health = (characterModel.health) ? characterModel.health : 100;
  this.evil = (characterModel.evil) ? characterModel.evil : true;
}

//Attack Prototype
Character.prototype.attack = function(attacked){
  attacked.health = attacked.health - _.random(1, 10);
  $('#health-number-'+attacked.name).empty();
  $('#health-number-'+attacked.name).append(attacked.health);
}

//Reacts to form submission by creating a new instance of Character
$("#pick-character").on('submit', function(event){
	event.preventDefault();
	assignCharacters();
  showGoodGuy();
  stopShowingIt('#pick-character');
  showBadGuy();
  $('.attack').removeClass('hidden');
});

//put the good guy into the dom
function showGoodGuy() {
  reusableTemplate('templates-display-character', '#good-guy', goodGuy);
}

function showBadGuy() {
  reusableTemplate('templates-display-character', '#bad-guy', badGuy)
}

function stopShowingIt(what) {
  $(what).addClass('hidden');
}

function assignCharacters(){
	var playerSelection = $('.dropdown :selected').val();
	var goodGuyModel = _.filter(characters, function(character){
		return playerSelection === character.name;
	});
	goodGuyModel = goodGuyModel[0];
	goodGuy = new Character(goodGuyModel);

  var badGuyModel = _.sample(badCharacters) //random badguy;
	badGuy = new Character (badGuyModel);
}

$('.attack').on('click', function(e) {
  e.preventDefault();
  goodGuy.attack(badGuy);
  badGuy.attack(goodGuy);
});

function gameover() {
  $('.show-character').addClass('hidden');
  $('.messages').removeClass('hidden');
  $('.messages').text('game-over');
}








//
