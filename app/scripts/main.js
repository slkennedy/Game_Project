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
  characterSelection = characterSelection || {};
  this.name = (characterSelection.name) ? characterSelection.name : 'No Name';
  this.health = (characterSelection.health) ? characterSelection.health : 100;
}

//Reacts to form submission by creating a new instance of Character
$("#pick-character").on('submit', function(event){
	event.preventDefault();
	var playerSelection = $('.dropdown').val();

	var goodGuyModel = _.each(characters, function(character){
		if(playerSelection === character.name) {
		}
	})
	console.log(goodGuyModel);
	goodGuy = new Character(goodGuyModel);
	console.log(goodGuy);
	showGoodGuy();
})
//put the good guy into the dom
function showGoodGuy() {
  reusableTemplate('templates-good-guy', '#good-guy', goodGuy);
}
