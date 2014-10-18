var TTTApp = angular.module('TTTApp', ["firebase"]);
var FB;

TTTApp.controller('TTTController', function($scope,$firebase) {
var ticTacRef = new Firebase("https://gregttt.firebaseIO.com/databaseGameContainer");
$scope.remoteGameContainer = $firebase(ticTacRef) ;
FB=($scope.remoteGameContainer);


//List of positions on board
 // CellList is no longer an array - it's a object collection of objects
  // Should not need other changes
  // someVar is not used - just there to show you how to have a second property for each cell
  $scope.cellList = new Object() ;
  $scope.cellList["0"] = {status: 0} ;
  $scope.cellList["1"] = {status: 1} ;
  $scope.cellList["2"] = {status: 2} ;
  $scope.cellList["3"] = {status: 3} ;
  $scope.cellList["4"] = {status: 4} ;
  $scope.cellList["5"] = {status: 5} ;
  $scope.cellList["6"] = {status: 6} ;
  $scope.cellList["7"] = {status: 7} ;
  $scope.cellList["8"] = {status: 8} ;

  $scope.gameInProgress = true;
  $scope.movecounter = 0;
  $scope.xMoves= [];
  $scope.oMoves= [];

  $scope.gameScore= {xScore: 0, oScore: 0, ties: 0};

  $scope.player1 = (($scope.movecounter % 2) == 1);
  $scope.player2 = (($scope.movecounter % 2) == 0);

  $scope.roundCounter = 0;


//array with winning logic 
$scope.possibleWinner= [
[0,1,2], [3,4,5], [6,7,8], 
[0,3,6], [1,4,7], [2,5,8],
[0,4,8], [2,4,6]
];


ticTacRef.once("value", function(data){
  console.log(data.val());
    // Let's find out how many players are on this board!
    console.log($scope.imPlayer);
      // If there are no players or we should be resetting, set to imPlayer0
      if(!data.val() || data.val().numPlayers == 2){
        $scope.imPlayer = 0;
        } 
        else {
        $scope.imPlayer = 1;
      }
      console.log($scope.imPlayer)
      $scope.gameContainer = {
        cellListArray: $scope.cellList,
        moveCount: $scope.movecounter,
        isGameInProgress: $scope.gameInProgress,
        theGameScore: $scope.gameScore,
        render:"",
        numPlayers: $scope.imPlayer +1
      };
      $scope.remoteGameContainer.$bind($scope, "gameContainer");
      $scope.resetButton();
    });

  $scope.$watch('gameContainer', function(){
  console.log('gameContainer changed!');
});

var winningFunction = function(moves) {
  

  // Go through all 8 possible wining moves
  for (var j = 0; j < $scope.possibleWinner.length; j++) {
    // For each one of these, we'll count up as we go if we find matches.  3 in a row means a win!
    var howManyMatches = 0;

    // The actual 3-member array of a winning condition
    var thisWinner = $scope.possibleWinner[j];
    // Go through this damned condition, all 3 numbers
    for(var k = 0; k<thisWinner.length; k++) {
      // Cycle through all the X moves thusfar
      for (var i = 0; i < moves.length; i++) {
        // If this xMove matches with a win condition square number, then we'll count another in the mix
        if(moves[i] == thisWinner[k])
        {
          //console.log("Match - ", thisWinner, moves[i]);
          howManyMatches++;
          // Since we matched here, we won't match any others, so might as well bail.
          break;
        }
      }
    }
    // Did we get 3 total matches in the testing above?
    if(howManyMatches == 3) {
      $scope.gameContainer.isGameInProgress= false;
      // Holy shit, yes we did!  We have a winner.
      if (($scope.gameContainer.moveCount % 2) == 1) 
      {
        $scope.gameContainer.render = "X Has Won!"
        console.log("X Wins: " + $scope.gameContainer.theGameScore.xScore);
        $scope.gameContainer.theGameScore.xScore ++;
        $scope.roundCounter = 

          console.log($scope.gameContainer.moveCount, $scope.render);
         
        }

        else
        {
        $scope.gameContainer.render  = "O Has Won!"
          console.log("O Wins: " + $scope.gameContainer.theGameScore.xScore);      
          $scope.gameContainer.theGameScore.oScore ++;

          console.log($scope.gameContainer.moveCount, $scope.render);
           
        };
      }
    }

    if ($scope.gameContainer.moveCount == 9 && $scope.render == "" )
    {

      $scope.gameContainer.render = "it's a tie";
      $scope.gameContainer.theGameScore.ties ++;
         
    }

  };

//Pushes Player 1 Clicks into Array xMoves[]
$scope.recordClickX = function(catchBallX){
  console.log("catch ball " + catchBallX);
  $scope.xMoves.push(catchBallX);
  // console.log($scope.xMoves);
};

//Pushes Player 2 Clicks into Array oMoves[]
$scope.recordClickO = function(catchBallO){
  $scope.oMoves.push(catchBallO);
  console.log($scope.oMoves);
};

 $scope.playerPicks = function(thisCell)
 {
console.log($scope.gameContainer)

  if ($scope.gameContainer.isGameInProgress == false || thisCell.status == "X" || thisCell.status == "O" || $scope.imPlayer != ($scope.gameContainer.moveCount % 2)){
      return;
    }    
      $scope.gameContainer.moveCount = $scope.gameContainer.moveCount + 1 ; //increase movecounter incrementally by 1

      if (($scope.gameContainer.moveCount % 2) == 1) {  //if movecounter is odd do the following

      $scope.recordClickX(thisCell.status);

      thisCell.status = "X" ;

    } else { //if movecounter is even do the following
      $scope.recordClickO(thisCell.status)
      console.log("Cell was: " + thisCell.status) 
      thisCell.status = "O" ;

    } 
     // console.log("Cell is now: (outside of loop) " + thisCell.status) ;
   

   winningFunction($scope.xMoves);
   winningFunction($scope.oMoves);

 };
$scope.resetButton = function(){
   
  // $scope.gameContainer.cellListArray = new Object() ;
  $scope.gameContainer.cellListArray["0"].status = 0 ;
  $scope.gameContainer.cellListArray["1"].status = 1 ;
  $scope.gameContainer.cellListArray["2"].status = 2 ;
  $scope.gameContainer.cellListArray["3"].status = 3 ;
  $scope.gameContainer.cellListArray["4"].status = 4 ;
  $scope.gameContainer.cellListArray["5"].status = 5 ;
  $scope.gameContainer.cellListArray["6"].status = 6 ;
  $scope.gameContainer.cellListArray["7"].status = 7 ;
  $scope.gameContainer.cellListArray["8"].status = 8 ;

  $scope.gameContainer.moveCount = 0 ;

  $scope.xMoves= [];
  $scope.oMoves= [];
  $scope.gameContainer.render = "";
  $scope.gameContainer.isGameInProgress= true;

 

};



}) ;