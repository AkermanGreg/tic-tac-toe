var TTTApp = angular.module('TTTApp', ["firebase"]);


TTTApp.controller('TTTController', function($scope, $http, $firebase) {
myHttp = $http;

var gregTTT = new Firebase("https://gregttt.firebaseio.com");

// $scope.gameElements = $firebase(gregTTT);


//   $scope.playerPicks = function() { 
//     //Add manually using standard JavaScript
//     gregTTT.push( {recordClickX:$scope.recordClickX , recordClickO:$scope.recordClickO } );
// $scope.recordClickX;
// $scope.recordClickO ;

//   };



//List of positions on board
$scope.resetButton = function(){
  $scope.cellList = 
  [
  {status: 0}, 
  {status: 1}, 
  {status: 2}, 
  {status: 3},
  {status: 4}, 
  {status: 5},
  {status: 6}, 
  {status: 7},
  {status: 8}
  ];

$scope.movecounter = 0 ;

$scope.xMoves= [];
$scope.oMoves= [];
$scope.render = "";
$scope.gameInProgress = true;

};

$scope.gameScore= {xScore: 0, oScore: 0, ties: 0};

//array with winning logic 
$scope.possibleWinner= [
[0,1,2], [3,4,5], [6,7,8], 
[0,3,6], [1,4,7], [2,5,8],
[0,4,8], [2,4,6]];
// j goes through the possible winner PRIMARY array (8 times)
//k goes through each sub-array's value.. there are 24 thus 24 times
//i 

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
    if(howManyMatches == 3) 
    {
      $scope.gameInProgress = false;
      // Holy shit, yes we did!  We have a winner.
      if (($scope.movecounter % 2) == 1) 
        {
        $scope.render = "X Has Won!"
        console.log("X Wins: " + $scope.gameScore.xScore);

        // for (i=0; i < cellList.status.length; i++) {
        //   if (cellList[i].status == 0) {
        //     cellList[i].status = "lost" ;
        //   }

        
        $scope.gameScore.xScore ++;

        // console.log($scope.gameScore.xScore)

        console.log($scope.movecounter, $scope.render);
        }

      else
        {
       $scope.render = "O Has Won!"
        console.log("O Wins: " + $scope.gameScore.xScore);
         // for (i=0; i < $scope.cellList.status.length; i++) {
         //  if (typeof cellList[i].status == "number") {
         //    typeof cellList[i].status = "string" ;
         //  }}
       $scope.gameScore.oScore ++;

        console.log($scope.movecounter, $scope.render);
        };

    }

  }


 if ($scope.movecounter == 9 && $scope.render == "" ||
  $scope.movecounter == 8 && $scope.render == "" )
 {
  
  $scope.render = "it's a tie";
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



//Move Counter
  $scope.movecounter = 0 ;

  $scope.playerPicks = function(thisCell) {
 if($scope.gameInProgress == false) {
  return
 }
    if (typeof thisCell.status == "number") { // if status is a number allow for status change
    $scope.movecounter = $scope.movecounter + 1 ; //increase movecounter incrementally by 1

    if (($scope.movecounter % 2) == 1) {  //if movecounter is odd do the following
   
      $scope.recordClickX(thisCell.status)

      thisCell.status = "X" ;

    } else { //if movecounter is even do the following
    $scope.recordClickO(thisCell.status)
    console.log("Cell was: " + thisCell.status) 
    thisCell.status = "O" ;

    } 
     // console.log("Cell is now: (outside of loop) " + thisCell.status) ;
    };

  winningFunction($scope.xMoves);
  winningFunction($scope.oMoves);
 
  


 

  };
//$scope.reSet = function() {
  //for(i=0; i < 10; i++) {
    //$scope.xMoves[i] = [null];
    //$scope.cellList.status[i]= [null]
  
  //}
//};
 $scope.resetButton();

}) ;