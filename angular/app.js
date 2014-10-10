var TTTApp = angular.module('TTTApp', []);

TTTApp.controller('TTTController', function ($scope) {

  $scope.testString = "Angular source, App, and Controller present" ;

//use NUMBERS and not strings, must update.
  $scope.cellList = [
      [{status: 0}, {status: 1}, {status: 2}], 
      [{status: 3}, {status: 4}, {status: 5}], 
      [{status: 6}, {status: 7}, {status: 8}]
  ]  




//Pushes Player 1 Clicks into Array xMoves[]
$scope.recordClickX = function(catchBallX){
$scope.xMoves.push(catchBallX);
console.log($scope.xMoves)
};
$scope.xMoves= [];

//Pushes Player 2 Clicks into Array oMoves[]
$scope.recordClickO = function(catchBallO){
$scope.oMoves.push(catchBallO);
console.log($scope.oMoves)
};
$scope.oMoves= [];

//array with winning logic 
//$scope.possibleWinner= [
//[0,1,2], [3,4,5], [6,7,8], 
//[0,3,6], [1,4,7], [2,5,8],



$scope.winningFunction = function(theWinner) {
for (var i = 0; i < $scope.xMoves.length; i++) {
    for (var j = 0; j < $scope.possibleWinner.length; j++) {
        if ($scope.xMoves[i] == $scope.possibleWinner[j]) {
         console.log("x won!")
        }
    }
} };

//Move Counter
  $scope.movecounter = 0 ;

  $scope.testJS = function() {
    console.log('Correctly accessing JS function.') ;
  } ;



  // if status is a number allow for status change


//
  $scope.playerPicks = function(thisCell) {
    if (typeof thisCell.status == "number") {
    $scope.movecounter = $scope.movecounter + 1 ; //increase movecounter incrementally by 1
    console.log("Cell was: " + thisCell.status) ;
    
 


    if (($scope.movecounter % 2) == 1) {  //if movecounter is odd do the following
    
   
      $scope.recordClickX(thisCell.status)
       thisCell.status = "X" ;
       console.log("This cell is " + thisCell.status)
       console.log('What thisCell is:',thisCell);

    } else { //if movecounter is even do the following
    $scope.recordClickO(thisCell.status)
      thisCell.status = "O" ;
      console.log("This cell is " + thisCell.status)
      console.log('What cell is',thisCell);
    } 
      console.log("Cell is now: (outside of loop) " + thisCell.status) ;
  };

  } ;


}) ;