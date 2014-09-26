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

//put the good guy into the dom
function showGoodGuy() {
  reusableTemplate('templates-good-guy', '#good-guy', goodGuy);
}
