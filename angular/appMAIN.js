var TTTApp = angular.module('TTTApp', []);

TTTApp.directive('myDirective', function () {
  return {
    template: '<ul class="rating">' +
                  '<li x-ng-repeat="star in stars" class="filled">' +
                      '\u2605' +
                  '</li>' +
                '</ul>',
    restrict: 'A',
    scope: {
      ratingValue: "="
    },
    link: function (scope, elem, attrs) {
      console.log("Directive", scope, elem, attrs);
      scope.stars = [];
      for(var x = 0; x < parseInt(scope.ratingValue); x++)
      {
        scope.stars.push({});
      }
    }
  }
});
TTTApp.controller('TTTController', function ($scope) {



//List of positions on board
$scope.resetButton = function(){
  $scope.cellList = [
    {status: 0}, {status: 1}, {status: 2}, 
    {status: 3}, {status: 4}, {status: 5}, 
    {status: 6}, {status: 7}, {status: 8}
  ];
  $scope.movecounter = 0 ;
  console.log("resetButton")
  $scope.xMoves= [];
  $scope.oMoves= [];
};

//array with winning logic 
$scope.possibleWinner= [
[0,1,2], [3,4,5], [6,7,8], 
[0,3,6], [1,4,7], [2,5,8],
[0,4,8], [2,4,6]];



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
      // Holy shit, yes we did!  We have a winner.
      if (($scope.movecounter % 2) == 1) {
      $scope.$apply(); alert("Hot damn!  x won.", thisWinner);
      
       
      }
      else{
    
      alert("Hot damn!  0 won.", thisWinner);
      
    };
    }
  }
};

//Pushes Player 1 Clicks into Array xMoves[]
$scope.recordClickX = function(catchBallX){
  $scope.xMoves.push(catchBallX);
  console.log($scope.xMoves);
};


//Pushes Player 2 Clicks into Array oMoves[]
$scope.recordClickO = function(catchBallO){
  $scope.oMoves.push(catchBallO);
  console.log($scope.oMoves);
};


//Move Counter
  $scope.movecounter = 0 ;


  $scope.playerPicks = function(thisCell) {
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

<!DOCTYPE html>
<html ng-app="TTTApp">
<head>
  <link rel="stylesheet" href="style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js"></script>
  <script src="app.js"></script>

</head>
<body><h1> Tic Tac Toe</h1>
    <div class="theBox" ng-controller="TTTController" > 
        <div x-my-directive="" x-rating-value="7"></div>
      <div ng-repeat="currentCell in cellList">
        <div class="allCellsAlways" ng-click="playerPicks(currentCell)"
           ng-class="{xclass: currentCell.status=='X', oclass: currentCell.status =='O'}" ng-click="playerPicks(currentCell)">
          Cell Contents: {{currentCell.status}}
        </div>
      </div>
        <button class="button" x-ng-click="resetButton()">Reset</button>
    </div>

</div>

</body>
</html>
