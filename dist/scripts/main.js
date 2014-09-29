// ## what happens during playerTurn function??
// - check if player is alive. if they are alive, continue. otherwise, you're done.
// - check if player is computer. if they are, the rest of their turn will be
// randomly generated based on available options.
// ### when the player is human
// - display the player's turn options as buttons with a "what do you want to
// do?" prompt. they might include: attack, poison, heal, etc.
// - if appropriate, ask the player who they want to target with that action.
// this can be a dropdown list, or maybe buttons or visual representations of
// each character that they might target.
// - perform the action.
// - check the player for a special feature that might let them have another
// action this turn, and if so, display their options again.
// - end their turn, now it's someone else's turn.

function playerTurn() {
    console.log("it's someone's turn");
}

function gamePlay(countComp, countHuman) {
    var playersCount = countComp + countHuman;
    var activePlayers;

    //set the gameover default value to false. this value is tested to see if
    //the gameplay should end. it will be updated
    var gameover = false;

    //makeActivePlayers function asks the user to select characters as many
    //times as the number of players they just chose.
    function makeActivePlayers(comps, hums) {
        var c = comps;
        var h = hums;
        if (h > 0) {
            //show the choose character form.
            startShowingIt('.choose-character');
            stopShowingIt('.dropdown');
            //the player selects or evil, set evil to true
            $('#imEvil').on('click', function(e) {
                e.preventDefault();
                startShowingIt('.dropdown');
                listAvailableCharacters(true);
                $('#pick-character p').remove();
            });
            $('#imGood').on('click', function(e) {
                e.preventDefault();
                startShowingIt('.dropdown');
                listAvailableCharacters(false);
                $('#pick-character p').remove();
            });
            //when the player clicks on the submit for this form
            $('#pick-character').on('submit', function(e) {
                e.preventDefault();
                if (!$('.dropdown').val()) {
                    $('#pick-character').append("<p>please choose good or evil</p>");

                } else {
                    you($('.dropdown').val());
                    assignCharacters();
                    showGoodGuy();
                    stopShowingIt('#pick-character');
                    showBadGuy();
                    startShowingIt('.show-character');
                    startShowingIt('.attack');
                    startShowingIt('.messages');
                }
            });
        }
        //after all the humans are created
        else {

        }

        // listAvailableCharacters(false);
        // $('#create-player').on('click', function() {
        //     //if the player should be a computer, autogenerate the character
        //     if ($('.choose-player .computer :checked')) {
        //         //autogen needs updating but creates a character at random
        //         //right now it only creates an evil character. needs to be
        //         //able to create evil or not evil based on passed arg.
        //         autoGeneratePlayer();
        //     }
        //     //if it should be a human,
        //     else {
        //         //assignCharacter function needs updating but gets the
        //         //character name from the dropdown box, and adds a player
        //         //to activePlayers list based on it. needs to have the index
        //         //added to it
        //         assignCharacter();
        //     }
        // });



    //this function checks to see if gameplay level gameover is truthy. so long
    //as it is not, we will go through each active player and give them a turn.
    //we are passing the playerTurn function the Character instance as it's
    //argument
    function takeTurns() {
        if (!gameover) {
            _.each(activePlayers, playerTurn);

        } else {
            gameover();
        }
    }

    makeActivePlayers(countComp, countHuman);
    takeTurns();
}

// ## what happens on page load?
// - user is prompted how many players? (user can pick a number)
// - after user picks a number the gameplay function is initiated

function gameSetup() {
    //display the page-load div that asks the user how many human and computer
    //players there are.
    stopShowingIt('.messages');
    startShowingIt('.page-load');
    $('#numberOfPlayers').on('click', function() {
        //this is currently unused but hopefully will allow for multiple game
        //instances to join on the mulitplayer internet version.
        var gameInstance = [];

        //get the value on the welcome form that indicates how many players the
        //user wants to create.
        var compNum = +$('.computer-num input').val();
        var humanNum = +$('.human-num input').val();
        var numberOfPlayers = compNum + humanNum;

        //make sure the player chooses at least 2 characters, display error
        //on screen if not and do not proceed
        if (numberOfPlayers < 2 || isNaN(numberOfPlayers)) {
            $('.page-load').append("<p>Please select at least 2 players</p>");
        }

        //the user has successfully submitted at least 2 characters and may
        //proceed to gamePlay.
        else {
            stopShowingIt('.page-load');
            gamePlay(compNum, humanNum);
        }
    });
}









//
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
      }
      else{
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
