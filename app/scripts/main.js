var characters = [{name:'sara', health:100}];
var goodGuy;


function reusableTemplate(templateId, container, model) {
    var templateFunction = _.template($('#' + templateId).text());
    var renderedTemplate = templateFunction(model);
    $(container).append(renderedTemplate);
}

_.each(characters, function(output){
	reusableTemplate('templates-character-list', '.dropdown', output);
});

function Character(characterSelection) {
  characterModel = characterSelection || {};
  this.name = (characterModel.name) ? characterModel.name : 'No Name';
  this.health = (characterModel.health) ? characterModel.health : 100;
}

//Reacts to form submission by creating a new instance of Character
$("#pick-character").on('submit', function(event){
	event.preventDefault();
	var playerSelection = $('.dropdown').val();

	var goodGuyModel = _.each(characters, function(character){
		playerSelection === character.name;
	});
	goodGuyModel = goodGuyModel[0];
	goodGuy = new Character(goodGuyModel);
	showGoodGuy();
  stopShowingIt('#pick-character');
})
//put the good guy into the dom
function showGoodGuy() {
  reusableTemplate('templates-good-guy', '#good-guy', goodGuy);
}

function stopShowingIt(what) {
  $(what).addClass('hidden');
}
