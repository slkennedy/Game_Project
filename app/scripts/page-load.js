// ## what happens on page load?
// - user is prompted how many players? (user can pick a number)
// - after user picks a number the gameplay function is initiated

function gameSetup() {
    //this message function will create a welcome message for the new user.
    //it will contain a submit button with id='numberOfPlayers' class='message'
    //they will be prompted to say how many players they want in their game.
    //the message will automatically disappear on click of the button
    message('templates-welcome', 'numberOfPlayers');
    $('#numberOfPlayers').on('click', function() {
        //get the value on the welcome template that indicates how many players the
        //user wants to create. if the number is not within a range (2-...??) or is
        //not an integer, message them that they did it wrong
        var numberOfPlayers = +$('.numberOfPlayers').val();
        if (numberOfPlayers < 2 || isNaN(numberOfPlayers)) {
            //this message function will create an error message that tells the user
            //to enter at least 2 players. it will autodisappear on click of 'ok'
            message('templates-enter-number', 'ok');
            //basically, start over when they click ok
            $('#ok').on('click', howManyPlayers);
        }
        else{
            gameplay(numberOfPlayers);
        }
    });
}










//
