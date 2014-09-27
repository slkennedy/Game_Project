var characters = [
	{name:'sara', health:20, evil:false},
	{name:'jess', health:20, evil:false},
	{name:'ollie-berry', health:20, evil:true},
	{name:'Jake-y-Poo', health:20, evil:true}
];
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
	attacker = this.name;
	setTimeout(function(){
	  	attackAlert(attacker, attacked.name);
	  }, 500);

  attacked.health = attacked.health - _.random(1, 10);

  if (attacked.health <= 0) {
	  gameover(attacked.name);
  }
  else {
	  $('#health-number-'+attacked.name).empty();
	  $('#health-number-'+attacked.name).append(attacked.health);
	}
}

//"Someone's being attacked", message
function attackAlert(attacker, attacked) {
  $('.messages').removeClass('hidden');
  $('.messages').text(attacker+" is attacking "+attacked);
  setTimeout(function(){stopShowingIt('.messages')}, 1000);
};


//create an extension of characters that makes a super evil badguy
function SuperBadGuy(characterSelection) {
  Character.apply(this, arguments);
  this.health = 500;
}

SuperBadGuy.prototype = Object.create(Character.prototype);

//Reacts to form submission by creating a new instance of Character
$("#pick-character").on('submit', function(event){
	event.preventDefault();
	assignCharacters();
  showGoodGuy();
  stopShowingIt('#pick-character');
  showBadGuy();
  startShowingIt('.attack');
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

function startShowingIt(what) {
  $(what).removeClass('hidden');
}

function assignCharacters(){
	var playerSelection = $('.dropdown :selected').val();
	var goodGuyModel = _.filter(characters, function(character){
		return playerSelection === character.name;
	});
	goodGuyModel = goodGuyModel[0];
	goodGuy = new Character(goodGuyModel);

  var badGuyModel = _.sample(badCharacters) //random badguy;
  var badGuyType = _.random(1);
  if (badGuyType === 0) {
      badGuy = new SuperBadGuy(badGuyModel);
  }
  else {
	    badGuy = new Character(badGuyModel);
  }
}

$('.attack').on('click', function(e) {
  e.preventDefault();
  stopShowingIt('.attack');
  goodGuy.attack(badGuy);
  setTimeout(function(){
  	badGuy.attack(goodGuy);
  }, 1000);
  setTimeout(function(){
  	startShowingIt('.attack');
  }, 2000);
});

function gameover(name) {
  stopShowingIt('.show-character');
  startShowingIt('.messages');
  $('.messages').text('game-over');
}







//
