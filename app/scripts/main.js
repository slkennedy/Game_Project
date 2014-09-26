var characters = [{name:'sara', health:100}];
var goodGuy = characters[0];


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

//put the good guy into the dom
function showGoodGuy() {

}
