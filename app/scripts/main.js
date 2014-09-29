//=============================================================================
                          //Global Variables
//=============================================================================
(function () {
    'use strict';

var characters = [{
    name: 'sara',
    health: 20,
    evil: false,
}, {
    name: 'jess',
    health: 20,
    evil: false
}, {
    name: 'ollie-berry',
    health: 20,
    evil: true
}, {
    name: 'Jake-y-Poo',
    health: 20,
    evil: true
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

  //Reacts to form submission by creating a new instance of Character
  // $("#pick-character").on('submit', function(event) {
  //     event.preventDefault();
  //     you($('.dropdown').val());
  //     assignCharacters();
  //     showGoodGuy();
  //     stopShowingIt('#pick-character');
  //     showBadGuy();
  //     startShowingIt('.show-character');
  //     startShowingIt('.attack');
  // });

//message board
function messages(attacker, attacked, healthResult) {
	whoseTurn = ("It's "+attacker+"'s turn.");
	playerAction = (attacker + " is attacking " + attacked);
	turnResult = (attacked+"'s new health is "+healthResult);

	reusableTemplate('templates-whose-turn', '.msg-div', whoseTurn);
	reusableTemplate('templates-turn-action', '.msg-div', playerAction);
	reusableTemplate('templates-turn-result', '.msg-div', turnResult);
}

  //Reacts to click of the attack button
  $('.attack').on('click', function(e) {
      e.preventDefault();
      startShowingIt('.messages');
      stopShowingIt('.attack');
        messages(goodGuy.name, badGuy.name);
          goodGuy.attack(badGuy);
          healthResult = badGuy.health;
          messages(healthResult);
          if (badGuy.health > 0) {
              updateLifeStatus(badGuy);
                messages(badGuy.name, goodGuy.name);
                  badGuy.attack(goodGuy);
                  healthResult = goodGuy.health;
         			messages(healthResult);
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
    this.alive = true;
    this.poisoned = false;
}

//Attack function on Character Prototype
Character.prototype.attack = function(attacked) {
    var attacker = this.name;
    attacked.health = attacked.health - _.random(1, 10);
    var healthResult = attacked.health;

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
    this.health = 500;
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
}

//"Someone's being attacked", message
// function attackAlert(attacker, attacked) {
//     startShowingIt('.messages');
//     $('.messages').text(attacker + " is attacking " + attacked);
// }

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



//
//
// our confusing attempt at understanding deferred
// function event() {
//   var defer = new $.Deferred();
//
//   // Pending when bad guy is still alive
//   if (badGuy.health > 0) {
//     defer.notify( function() {
//       goodGuy.attack(badGuy);
//     });
//   }
//
//   // Reject when bad guy is dead
//   else {
//     defer.reject( function() {
//       gameover();
//     });
//   });
//
// // while the defer is pending do this stuff:
// setTimeout(function working() {
//   if ( dfd.state() === "pending" ) {
//     defer.notify( "working... " );
//     setInterval( working, 500 );
//   }
// }, 1 );
//
//   // Return the Promise so caller can't change the Deferred
//   return defer.promise();
// }
//
// // Attach resolve, fail, and progress handlers for event
// $.when( event() ).then(
//   function(){
//     updateLifeStatus(badGuy);
//   },
//   function() {
//     gameover();
//   },
//   function() {
//     goodGuy.attack(badGuy);
//   }
// );



// This version of clicking attack button is our first attempt at having time offset stuff
// $('.attack').on('click', function(e) {
//   e.preventDefault();
//   stopShowingIt('.attack');
//   setTimeout(function() {
//     attackAlert(goodGuy.name, badGuy.name);
//     setTimeout(function() {
//       goodGuy.attack(badGuy);
//       updateLifeStatus(badGuy);
//     }, 500);
//   }, 500)
//   .done(function() {
//     if (badGuy.health > 0) {
//       setTimeout(function() {
//         attackAlert(badGuy.name, goodGuy.name);
//         setTimeout(function() {
//           badGuy.attack(goodGuy);
//           updateLifeStatus(goodGuy);
//         }, 500);
//       }, 500)
//       .done(function() {
//         startShowingIt('.attack');
//       });
//     }
//   });
// });


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




});
//
