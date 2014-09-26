var characters = [{name:'sara', health:100}];

function reusableTemplate(templateId, container, model) {
    var templateFunction = _.template($('#' + templateId).text());
    var renderedTemplate = templateFunction(model);
    $(container).append(renderedTemplate);
}

_.each(characters, function(output){
	reusableTemplate('characterList', '.dropdown', output);
})

function Character(characterSelection) {
  characterSelection = characterSelection || {};
  this.name = (characterSelection.name) ? characterSelection.name : 'No Name';
  this.health = (characterSelection.health) ? characterSelection.health : 100;
}

//Reacts to form submission by creating a new instance of Character
$("#pickcharacter").on('submit', function(event){
	event.preventDefault();
	var playerSelection = {name:$('.dropdown').val();
	console.log(playerSelection);

	var goodGuy = new Character (function (){

	})
})