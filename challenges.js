/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, wonCounter, player1, player2;

gameStart ();


var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //3. Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
        
        /*
        if (dice === 6 && lastDice === 6) {
            //Player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
        lastDice = dice;
        */
    }    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.winning-score').value;
        var winningScore;
        
        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('active-winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

            wonCounter[activePlayer]+=1;

            document.getElementById('btn-next').style.display = 'block';
            document.getElementById('btn-new-next').style.display = 'block';
            
            document.getElementById('btn-new').style.display = 'none';
            document.getElementById('btn-roll').style.display = 'none';
            document.getElementById('btn-hold').style.display = 'none';

            if (activePlayer === 0)
            document.getElementById('won-games-0').textContent = wonCounter[activePlayer];
            else
            document.getElementById('won-games-1').textContent = wonCounter[activePlayer];

        } else {
            //Next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-new-next').addEventListener('click', function(){
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active-winner');
    
    document.getElementById('btn-new').style.display = 'block';
    document.getElementById('btn-roll').style.display = 'block';
    document.getElementById('btn-hold').style.display = 'block';

    init();
});



function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    wonCounter = [0, 0];

    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('btn-new-next').style.display = 'none';
    document.getElementById('btn-next').style.display = 'none';

    document.getElementById('won-games-0').textContent = '0';
    document.getElementById('won-games-1').textContent = '0';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.name-player1').value= '';
    document.querySelector('.name-player2').value = '';
    document.querySelector('.winning-score').value = '';

    //var person = prompt("Player 1 and 2 names:");
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    console.log("done with init")
}

document.querySelector('.btn-next').addEventListener('click', next);

function next() {

    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active-winner');
    
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('btn-new-next').style.display = 'none';
    document.getElementById('btn-next').style.display = 'none';

    document.getElementById('name-0').textContent = player1;
    document.getElementById('name-1').textContent = player2;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


    document.getElementById('btn-new').style.display = 'block';
    document.getElementById('btn-roll').style.display = 'block';
    document.getElementById('btn-hold').style.display = 'block';

}
  
document.querySelector('.btn-add').addEventListener('click', function(){    

    player1 = document.querySelector('.name-player1').value;
    player2 = document.querySelector('.name-player2').value;
    var gameScore = document.querySelector('.winning-score').value;

    if (gameScore === ''){
        gameScore = 100;
    }
    //console.log(Number.isInteger(parseInt(gameScore)));
    
    // && Number.isInteger(parseInt(gameScore))
    if (player1 && player2 && Number.isInteger(parseInt(gameScore))){
        document.getElementById('name-0').textContent = player1;
        document.getElementById('name-1').textContent = player2;
        
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }      
});

document.querySelector('.btn-skip').addEventListener('click', function(){    
 
    document.querySelector('.name-player1').value= '';
    document.querySelector('.name-player2').value = '';
    document.querySelector('.final-score').value = '';
        
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
});

   
function gameStart(){
    var modal = document.getElementById("startGame");
    modal.style.display = "block";

    setTimeout(function(){
        var modal = document.getElementById("startGame");

        
        modal.style.display = "none";
      },1500);

          $("#statrDame").fadeOut(3000);
    

    init();
}

/*
document.querySelector('.btn-play').addEventListener('click', function(){    
       
    var modal = document.getElementById("startGame");
    modal.style.display = "none";
    init()

});
*/




