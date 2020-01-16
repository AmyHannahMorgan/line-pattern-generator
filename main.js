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

      this.entranceDirection = null;
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

    get directions() {
      let array = []
      if(this.entranceDirection === null) {
        this.n !== null && !this.n.visited ? array.push(this.n) : null;
        this.s !== null && !this.s.visited ? array.push(this.s) : null;
        this.e !== null && !this.e.visited ? array.push(this.e) : null;
        this.w !== null && !this.w.visited ? array.push(this.w) : null;
        this.nw !== null && !this.nw.visited ? array.push(this.nw) : null;
        this.ne !== null && !this.ne.visited ? array.push(this.ne) : null;
        this.sw !== null && !this.sw.visited ? array.push(this.sw) : null;
        this.se !== null && !this.se.visited ? array.push(this.se) : null;
      }
      else {
        this.n !== null && !this.n.visited && (this.entranceDirection === 's' || this.entranceDirection === 'se' || this.entranceDirection === 'sw') ? array.push(this.n) : null;
        this.s !== null && !this.s.visited && (this.entranceDirection === 'n' || this.entranceDirection === 'ne' || this.entranceDirection === 'nw') ? array.push(this.s) : null;
        this.e !== null && !this.e.visited && (this.entranceDirection === 'w' || this.entranceDirection === 'nw' || this.entranceDirection === 'sw') ? array.push(this.e) : null;
        this.w !== null && !this.w.visited && (this.entranceDirection === 'e' || this.entranceDirection === 'ne' || this.entranceDirection === 'se') ? array.push(this.w) : null;
        this.nw !== null && !this.nw.visited && (this.entranceDirection === 'se' || this.entranceDirection === 's' || this.entranceDirection === 'e') ? array.push(this.nw) : null;
        this.ne !== null && !this.ne.visited && (this.entranceDirection === 'sw' || this.entranceDirection === 's' || this.entranceDirection === 'w') ? array.push(this.ne) : null;
        this.sw !== null && !this.sw.visited && (this.entranceDirection === 'ne' || this.entranceDirection === 'n' || this.entranceDirection === 'e') ? array.push(this.sw) : null;
        this.se !== null && !this.se.visited && (this.entranceDirection === 'nw' || this.entranceDirection === 'n' || this.entranceDirection === 'w') ? array.push(this.se) : null;
      }

      return array;
    }

    set entrance(direction) {
      this.entranceDirection = direction;
    }
  }
  
  const canvas = document.querySelector('#canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  
  const pathWidth = 20;
  ctx.lineWidth = pathWidth / 2
  
  const xSegments = canvas.width / pathWidth;
  const ySegments = canvas.height / pathWidth;
  const minHops = Math.round(((xSegments + ySegments) / 2) / 10);
  //debug lines
  // ctx.beginPath();
  // for(let i = 1; i < xSegments; i++) {
  //   ctx.moveTo(i * pathWidth, 0);
  //   ctx.lineTo(i * pathWidth, canvas.height);
  // }
  // for(let i = 1; i < ySegments; i++) {
  //   ctx.moveTo(0, i * pathWidth);
  //   ctx.lineTo(canvas.width, i * pathWidth);
  // }
  // ctx.strokeStyle = 'red';
  // ctx.stroke();
  // ctx.strokeStyle = 'black';

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

  buildPaths();
  
  function buildPaths() {
    let paths = [];
    
    while(!checkPaths()) {
      let currNode = getPathStart();
      currNode.visited = true;
      console.log(currNode);

      let tolerance = Math.random();
      let incriment = 0;
      let end = false;
      let currPath = [currNode];
      
      ctx.beginPath();
      ctx.moveTo(currNode.centerX, currNode.centerY)
      while(!end) {
        // let found = false;
        let directions = currNode.directions;
        let nextNode = directions[RNG(0, directions.length)];

        if(nextNode === undefined) {
          end = true;
          break;
        }

        nextNode.entrance = getEntrance(currNode, nextNode);

        currNode = nextNode;
        ctx.lineTo(currNode.centerX, currNode.centerY);
        currPath.push(currNode);
        currNode.visited = true;

        let northCheck = currNode.n === null || currNode.n.visited === true ? true : false;
        let southCheck = currNode.s === null || currNode.s.visited === true ? true : false;
        let eastCheck = currNode.e === null || currNode.e.visited === true ? true : false;
        let westCheck = currNode.w === null || currNode.w.visited === true ? true : false;
        let nWestCheck = currNode.nw === null || currNode.nw.visited === true ? true : false;
        let nEastCheck = currNode.ne === null || currNode.ne.visited === true ? true : false;
        let sWestCheck = currNode.sw === null || currNode.sw.visited === true ? true : false;
        let sEastCheck = currNode.se === null || currNode.se.visited === true ? true : false;

        let test = Math.random() + incriment;

        if(northCheck && southCheck && eastCheck && westCheck && nWestCheck && nEastCheck && sWestCheck && sEastCheck) {
            end = true;
            break;
        }
        
        if(currPath.length >= minHops){
          if(test >= tolerance) {
              end = true
          }
          else {
              if(incriment === 0) {
                  incriment = Math.random() / 10;
              }
              else incriment += incriment;
          }
        }
      }
      paths.push(currPath);
      ctx.stroke();
    }

    return paths;
  }
  
  function getPathStart(){
    let unvisited = [];
    for(let x = 0; x < pathSegments.length; x++) {
        for(let y = 0; y < pathSegments[x].length; y++) {
            if(!pathSegments[x][y].visited) {
                unvisited.push(pathSegments[x][y]);
            }
        }
    }
    return unvisited[RNG(0, unvisited.length)];
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

  function getEntrance(parent, child) {
    let string = ''

    if(parent.y > child.y) {
      string += 's';
    }
    else if (parent.y < child.y) {
      string += 'n';
    }

    if(parent.x > child.x) {
      string += 'e';
    }
    else if(parent.x < child.x) {
      string += 'w';
    }

    return string;
  }
  
  function RNG(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }