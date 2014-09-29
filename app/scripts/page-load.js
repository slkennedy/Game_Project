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