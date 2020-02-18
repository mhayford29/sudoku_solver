var sampleGrid = [
  ['5','3',0,0,'7',0,0,0,0],
  ['6',0,0,'1','9','5',0,0,0],
  [0,'9','8',0,0,0,0,'6',0],
  ['8',0,0,0,'6',0,0,0,'3'],
  ['4',0,0,'8',0,'3',0,0,'1'],
  ['7',0,0,0,'2',0,0,0,'6'],
  [0,'6',0,0,0,0,'2','8',0],
  [0,0,0,'4','1','9',0,0,'5'],
  [0,0,0,0,'8',0,0,'7','9']
]

function main(){
  var grid = generateGrid()
  var result = gameLogic(grid, 0, 0)
  console.log(result)
  return result
}

function generateGrid() {
  var x = document.getElementById("frm1");

  const matrix = new Array(9).fill(0).map(() => new Array(9).fill(0));

  for(var i = 0; i < x.length; i++){
    var el = document.getElementById(`${i + 1}`)
    
    var row = Math.floor(i/9)
    var col = Math.floor(i%9)

    el.value ? matrix[row][col] = el.value : null
  }
  return matrix
}

var getQuadrant = (row, col) => {
  var quadrantRow = -1 
  var quadrantCol = -1
  while(row > -1){
    row -= 3
    quadrantRow++
  }
  while(col > -1){
    col -= 3
    quadrantCol++
  }
  return [quadrantRow+1, quadrantCol+1]
}

var canPlaceInQuadrant = (number, grid, quadrant /*[row, col]*/) => {
  var row = quadrant[0] 
  var col = quadrant[1]
  var rowColMap = {
    '1': [0,1,2],
    '2': [3,4,5],
    '3': [6,7,8],
  }
  for(var i = 0; i < rowColMap[row].length; i++){
    for(var j = 0; j < rowColMap[col].length; j++){
      let r = rowColMap[row][i]
      let c = rowColMap[col][j]
      if(grid[r][c] == number){
        return false
      }
    }
  }
  return true
}

var canPlaceInRow = (grid, row, number) => {
  for(var i = 0; i < grid[row].length; i++){
    if(grid[row][i] == number){
      return false
    }
  }
  return true
}

var canPlaceInColumn = (grid, col, number) => {
  for(var i = 0; i < grid.length; i++){
    if(grid[i][col] == number){
      return false
    }
  }
  return true
}

var canPlaceAtCoordinate = (number, row, column, grid) => {
  let quad = getQuadrant(row, column)
  return canPlaceInColumn(grid, column, number) && canPlaceInRow(grid, row, number) && canPlaceInQuadrant(number, grid, quad)
}


var gameLogic = (grid, row, col) => {
  
  var result = null;
  
  var dfs = (row, col) => {
    
    if(result){
      return
    }

    //base case -- we have finished when our row is beyond the board
    if(row === grid.length){
      //create copy of result
      result = grid.map(function(arr) {
        return arr.slice();
      });
      return
    }
      
    //base case -- move to next row when our column is beyond the board
    if(col === grid[row].length){
      dfs(row + 1, 0)
    }
  
    //numbers represented as strings are fixed, continue to next space
    if(typeof grid[row][col] === 'string'){
      dfs(row, col + 1)
    }
    
    //for loop iterates through all possible number choices
    //place a number into spot if conditions are met
    //if backtracking, reset spot to 0
    for(var i = 1; i <= grid[row].length; i++){
      if(grid[row][col] === 0 && canPlaceAtCoordinate(i, row, col, grid)){
        grid[row][col] = i
        dfs(row, col + 1)
        grid[row][col] = 0
      } 
    }
  }

  dfs(row, col)
  
  return result;
};


