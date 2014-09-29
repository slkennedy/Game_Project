//=============================================================================
//Global Variables
//=============================================================================
// (function (){
// 	'use strict';

var characters = [{
    name: 'Kirk',
    health: 100,
    evil: false,
    img: "../images/James-T-Kirk.jpg"
}, {
    name: 'Spock',
    health: 100,
    evil: false,
    img: "../images/spock.jpg"

}, {
    name: 'Klingon',
    health: 100,
    evil: true,
    img: "../images/klingon.jpg"
}, {
    name: 'Khan',
    health: 100,
    evil: true,
    img: "../images/khan.jpg"
}];
var goodCharacters = _.filter(characters, function(character) {
    return character.evil === false;
});
var badCharacters = _.filter(characters, function(character) {
    return character.evil === true;
});
var goodGuy;
var badGuy;
var activePlayers = [];
var whoseTurn;
var playerAction;
var turnResult;

//=============================================================================
//User-Caused Events
//=============================================================================

//Reacts to click of the attack button
$('.attack').on('click', function(e) {
    e.preventDefault();
    startShowingIt('.messages');
    stopShowingIt('.attack');
    goodGuy.attack(badGuy);
    messages(goodGuy.name, badGuy.name, badGuy.health);
    if (badGuy.health > 0) {
        updateLifeStatus(badGuy);
        badGuy.attack(goodGuy);
        messages(badGuy.name, goodGuy.name, goodGuy.health);
        if (goodGuy.health > 0) {
            updateLifeStatus(goodGuy);
            startShowingIt('.attack');
        } else {
            goodGuy.alive = false;
            gameover();
        }
    } else {
        badGuy.alive = false;
        gameover();
    }
});

//=============================================================================
//Character constructors
//=============================================================================

function Character(characterSelection) {
    characterModel = characterSelection || {};
    this.name = (characterModel.name) ? characterModel.name : 'No Name';
    this.health = (characterModel.health) ? characterModel.health : 100;
    this.evil = (characterModel.evil) ? characterModel.evil : true;
    this.img = characterModel.img;
    this.alive = true;
    this.poisoned = false;
}

//Attack function on Character Prototype
Character.prototype.attack = function(attacked) {
    var attacker = this.name;
    attacked.health = attacked.health - _.random(1, 10);

};

Character.prototype.poison = function(poisoned) {
    this.poisoned = true;
};

Character.prototype.antidote = function(antidote) {
    this.poisoned = false;
};

//create an extension of characters that makes a super evil badguy
function SuperBadGuy(characterSelection) {
    Character.apply(this, arguments);
    this.health = 150;
}

SuperBadGuy.prototype = Object.create(Character.prototype);

//=============================================================================
//Update the DOM
//=============================================================================

//Add each character to the dropdown menu at player selection, filtered to show
//only evil or not evil based on passed param
function listAvailableCharacters(evil) {
    var listOfAvail = _.filter(characters, function(character) {
        return character.evil === evil;
    });
    $('.dropdown').empty();
    _.each(listOfAvail, function(output) {
        reusableTemplate('templates-character-list', '.dropdown', output);
    });
}

//who are you? adds your character name as an id to the container div
function you(yourCharacter) {
    $('.container').attr('id', yourCharacter);
}

//Update health display
function updateLifeStatus(character) {
    $('#health-number-' + character.name).empty();
    $('#health-number-' + character.name).append(character.health);

    $('.health-' + character.name).animate({
        'width': (2 * character.health) + 'px'
    }, 'ease');
};

//put the good guy into the dom
function showGoodGuy() {
    reusableTemplate('templates-display-character', '#good-guy', goodGuy);
}

//put the bad guy into the dom
function showBadGuy() {
    reusableTemplate('templates-display-character', '#bad-guy', badGuy);
}

//gameover message
function gameover(name) {
    stopShowingIt('.messages');
    stopShowingIt('.show-character');
    startShowingIt('.gameover');
    var gameoverMessage = function() {
        var message;
        var yourCharacter = getYou();
        if (yourCharacter.alive === true) {
            message = "Gameover, you win!";
        } else {
            message = "Gameover, you lose!";
        }
        return message;
    };
    $('.gameover').prepend(gameoverMessage);
}

//message board
function messages(attacker, attacked, healthResult) {
    whoseTurn = ("It's " + attacker + "'s turn.");
    playerAction = (attacker + " is attacking " + attacked);
    turnResult = (attacked + "'s new health is " + healthResult);

    reusableTemplate('templates-whose-turn', '.msg-div', whoseTurn);
    reusableTemplate('templates-turn-action', '.msg-div', playerAction);
    reusableTemplate('templates-turn-result', '.msg-div', turnResult);

    var msgHeight = $('.messages').prop('scrollHeight');
    $('.messages').scrollTop(msgHeight);
}


//=============================================================================
//GamePlay functions
//=============================================================================

//taking user choice of charcter and auto-generating bad guy
function assignCharacters() {
    var playerSelection = $('.dropdown :selected').val();
    var goodGuyModel = _.filter(characters, function(character) {
        return playerSelection === character.name;
    });
    goodGuyModel = goodGuyModel[0];
    goodGuy = new Character(goodGuyModel);
    activePlayers.push(goodGuy);
    autoGeneratePlayer();
}

//autogenerates a computer player who is a badguy
function autoGeneratePlayer() {
    var badGuyModel = _.sample(badCharacters); //random badguy;
    var badGuyType = _.random(1);
    if (badGuyType === 0) {
        badGuy = new SuperBadGuy(badGuyModel);
    } else {
        badGuy = new Character(badGuyModel);
    }
    activePlayers.push(badGuy);
}


//=============================================================================
//General Functions
//=============================================================================

function reusableTemplate(templateId, container, model) {
    var templateFunction = _.template($('#' + templateId).text());
    var renderedTemplate = templateFunction(model);
    $(container).append(renderedTemplate);
}


function stopShowingIt(what) {
    $(what).addClass('hidden');
}

function startShowingIt(what) {
    $(what).removeClass('hidden');
}

//this function returns the Character instance you are playing with based on the
//name set to your container div in the 'you' function
function getYou() {
    var yourName = $('.container').attr('id');
    var yourCharacter;
    _.each(activePlayers, function(player) {
        if (player.name === yourName) {
            yourCharacter = player;
        }
    });
    return yourCharacter;
}




gameSetup();




// });

//