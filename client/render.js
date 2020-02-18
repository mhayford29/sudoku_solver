
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

var mainRender = (resultGrid) => {
  var temp = generateTemplate(resultGrid)
  render(temp, document.querySelector('#result'))
}

var render = (template, node) => {
  if (!node) return;
	node.innerHTML = template;
}

var generateTemplate = (grid) => {
  var template = ''
  var fatRight = `border-right-width: 3px`
  var fatBottom = `border-bottom-width: 3px`
  var fatTop = `border-top-width: 3px`
  var fatLeft = `border-left-width: 3px`
  for(var i = 0; i < grid.length; i++){
    template = template.concat(`<div class="result-row">`)
    for(var j = 0; j < grid[i].length; j++){
      typeof grid[i][j] === 'number' ?
      template = template.concat(`<span style='color: red; ${(j+1)%3 === 0 ? fatRight : null}; ${(i+1)%3 === 0 ? fatBottom : null}; ${i === 0 ? fatTop : null}; ${j === 0 ? fatLeft : null}' class='result-item'>${grid[i][j]}</span>`) :
      template = template.concat(`<span style='${(j+1)%3 === 0 ? fatRight : null}; ${(i+1)%3 === 0 ? fatBottom : null}; ${i === 0 ? fatTop : null}; ${j === 0 ? fatLeft : null}' class='result-item'>${grid[i][j]}</span>`)
    }
    template = template.concat('</div>')
  }
  console.log(template)
  return template
}