class PathSegment {
    constructor(x, y, width) {
      this.visited = false;
      this.x = x;
      this.y = y;
      this.abX = this.x * width;
      this.abY = this.y * width;
      this.centerX = this.abX + (width / 2);
      this.centerY = this.abY + (width / 2);
    }
  }
  
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  
  const pathWidth = 10;
  
  const xSegments = canvas.width / pathWidth;
  const ySegments = canvas.height / pathWidth;
  const pathSegments = [];
  
  for(let x = 0; x < xSegments; x++) {
    let ar = [];
    for(let y = 0; y < ySegments; y++) {
      ar.push(new PathSegment(x, y, pathWidth));
    }
    pathSegments.push(ar);
  }
  
  function buildPaths() {
    let paths = [];
    
    while(!checkPaths()) {
      let pathStart = getPathStart();
      let currNode = pathSegments[pathStart[0]][pathStart[1]];
      let tolerance = Math.random();
      let incriment = 0;
      let end = false;
      let currPath = [];
      
      ctx.beginPath();
      ctx.moveTo(currNode.centerX, currNode.centerY)
      while(!end) {
        let direction = RNG(0,8);
      }
    }
  }
  
  function getPathStart(){
    let posX = RNG(0, xSegments);
    let posY = RNG(0, xSegments);
    
    if(!pathSegments[posX][posY].visited) {
      return [posX, posY];
    }
    else return getPathStart();
  }
  
  function checkPaths() {
    let flag = true;
    for(let x = 0; x < pathSegments.length; x++) {
      for(let y = 0; y < pathSegments[x].length; y++) {
        if(!pathSegments[x][y].visited) {
          flag = false;
          break;
        }
      }
    }
    
    return flag;
  }
  
  function RNG(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }