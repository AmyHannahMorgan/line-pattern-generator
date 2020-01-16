class PathSegment {
    constructor(x, y, width) {
      this.visited = false;
      this.x = x;
      this.y = y;
      this.abX = this.x * width;
      this.abY = this.y * width;
      this.centerX = this.abX + (width / 2);
      this.centerY = this.abY + (width / 2);

      this.n = null
      this.s = null
      this.e = null
      this.w = null
      this.nw = null
      this.ne = null
      this.sw = null
      this.se = null
    }

    setDirection(direction, value) {
        switch(direction) {
            case 'n':
                this.n = value;
                break;
            case 's':
                this.s = value;
                break;
            case 'e':
                this.e = value;
                break;
            case 'w':
                this.w = value;
                break;
            case 'nw':
                this.nw = value;
                break;
            case 'ne':
                this.ne = value;
                break;
            case 'sw':
                this.sw = value;
                break;
            case 'se':
                this.se = value;
                break;
            default:
                throw `ValueError: ${direction} is not a valid direction`;
        }
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

  for(let x = 0; x < pathSegments.length; x++) {
      for(let y = 0; y < pathSegments[x].length; y++) {
          let currNode = pathSegments[x][y];

          let topEdge = y === 0 ? true : false
          let bottomEdge = y === pathSegments[x].length - 1 ? true : false
          let leftEdge = x === 0 ? true : false
          let rightEdge = x === pathSegments.length - 1 ? true : false

          if(!topEdge) {
            currNode.setDirection('n', pathSegments[x][y - 1]);
          }

          if(!bottomEdge) {
              currNode.setDirection('s', pathSegments[x][y + 1]);
          }

          if(!leftEdge) {
              currNode.setDirection('w', pathSegments[x - 1][y]);
          }

          if(!rightEdge) {
              currNode.setDirection('e', pathSegments[x + 1][y]);
          }

          if(!topEdge && !leftEdge) {
              currNode.setDirection('nw', pathSegments[x - 1][y - 1]);
          }

          if(!topEdge && !rightEdge) {
              currNode.setDirection('ne', pathSegments[x + 1][y - 1]);
          }

          if(!bottomEdge && !leftEdge) {
              currNode.setDirection('sw', pathSegments[x - 1][y + 1]);
          }

          if(!bottomEdge && !rightEdge) {
              currNode.setDirection('se', pathSegments[x + 1][y + 1]);
          }
      }
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