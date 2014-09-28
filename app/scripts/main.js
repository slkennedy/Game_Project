//=============================================================================
                          //Global Variables
//=============================================================================

var characters = [{
    name: 'sara',
    health: 20,
    evil: false
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

//=============================================================================
                          //User-Caused Events
//=============================================================================

  //Reacts to form submission by creating a new instance of Character
  $("#pick-character").on('submit', function(event) {
      event.preventDefault();
      assignCharacters();
      showGoodGuy();
      stopShowingIt('#pick-character');
      showBadGuy();
      startShowingIt('.attack');
  });

  //Reacts to click of the attack button
  $('.attack').on('click', function(e) {
      e.preventDefault();
      goodGuy.attack(badGuy);
      if (badGuy.health > 0) {
          updateLifeStatus(badGuy);
          badGuy.attack(goodGuy);
          if (goodGuy.health > 0) {
              updateLifeStatus(goodGuy);
          } else {
              gameover();
          }
      } else {
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
}

//Attack function on Character Prototype
Character.prototype.attack = function(attacked) {
    attacker = this.name;
    attacked.health = attacked.health - _.random(1, 10);

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

//Add each good character to the dropdown menu at game start
_.each(goodCharacters, function(output) {
    reusableTemplate('templates-character-list', '.dropdown', output);
});

//Update health display
function updateLifeStatus(character) {
    $('#health-number-' + character.name).empty();
    $('#health-number-' + character.name).append(character.health);
}

//"Someone's being attacked", message
function attackAlert(attacker, attacked) {
    startShowingIt('.messages');
    $('.messages').text(attacker + " is attacking " + attacked);
    setTimeout(function() {
        stopShowingIt('.messages');
    }, 1000);
}

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
    stopShowingIt('.show-character');
    startShowingIt('.messages');
    $('.messages').text('game-over');
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

//
