function gamePlay(countComp, countHuman) {
    var playersCount = countComp + countHuman;
    var activePlayers;

    //set the gameover default value to false. this value is tested to see if
    //the gameplay should end. it will be updated
    var gameover = false;

    //makeActivePlayers function asks the user to select characters as many
    //times as the number of players they just chose.
    function makeActivePlayers(comps, hums) {
            //open a choose player div w/form prompting the user to select the
            //character.
            startShowingIt('.choose-character');
            listAvailableCharacters(false);
            $('#create-player').on('click', function() {
                //if the player should be a computer, autogenerate the character
                if ($('.choose-player .computer :checked')) {
                    //autogen needs updating but creates a character at random
                    //right now it only creates an evil character. needs to be
                    //able to create evil or not evil based on passed arg.
                    autoGeneratePlayer();
                }
                //if it should be a human,
                else {
                    //assignCharacter function needs updating but gets the
                    //character name from the dropdown box, and adds a player
                    //to activePlayers list based on it. needs to have the index
                    //added to it
                    assignCharacter();
                }
            });
    }


    //this function checks to see if gameplay level gameover is truthy. so long
    //as it is not, we will go through each active player and give them a turn.
    //we are passing the playerTurn function the Character instance as it's
    //argument
    function takeTurns() {
        if (!gameover) {
            _.each(activePlayers, playerTurn);
        }
        else {
            gameover();
        }
    }

    makeActivePlayers(countComp, countHuman);
    takeTurns();
}
