const octal = [
    '☷', '☶', '☵', '☴', 
    '☳', '☲', '☱', '☰'
]

var cnv

var contractID = "kljansdlfkau9248rlqafhi4983"
var p1Address = "kljansdlfkau9248rlqafhi4983"
var p2Address = "kljansdlfkau9248rlqafhi4983"
var seedValue = 1
var game = true

var record = []
var holes = 8 //9
var seeds = 4 //11

var turn = 1
var player = 0
var side = 0

var board = [[], []]
var house = [0, 0]

var boardDisplay = [[], []]

function preload() {
}


function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0)
  background(255);
  fill(0)

turn = 1
player = 0
side = 0

board = [[], []]
house = [0, 0]

var boardDisplay = [[], []]

  startGame(holes, seeds)
  textAlign(CENTER, CENTER)
  consolDisplay()
}


function draw() {
  clear()
  // contractDisplay()
  if (game) {
    gameDisplay()
  } else[
    gameStats()
  ]
  // console.clear()
  // console.log(board)
  // console.log(house)
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function keyPressed() {
  let keyNum = int(key)-1
  move(keyNum)
  if (keyCode === RETURN){
    setup()
  }
}

function startGame(holes, seeds) {
  for (let i = 0; i < holes; i++) {
    board[0].push(seeds)
    board[1].push(seeds)
  }
    board[0].push("house")
    board[1].push("house")
}

function move(i) {
  goAgain = false

  function steal(i) {
    let sideMap = [7, 6, 5, 4, 3, 2, 1, 0]
    if (player == 0) {
      other = 1
    } else {
      other = 0
    }

    if (board[other][sideMap[i]] > 0) {
      
      house[player] += board[player][i]
      house[player] += board[other][sideMap[i]]

      board[player][i] = 0
      board[other][sideMap[i]] = 0

    } else {
      return false
    }
    // goAgain = true
    consolDisplay()
    turn++
  }




  if (board[player][i] > 0) {
    
    // [pickup seeds]
    let hand = 0
    let side = 0
    side += player
    hand += board[side][i]
    board[side][i] = 0
    // move hand to next hole and deposit seed while there are seeds inhand
    while (hand > 0) {
      //move to next hole
      i++

      // if over house
      if (board[side][i] == 'house') {
        // if own house
        if (side == player) {
          house[player]++
          hand--
        
          //check if hand empty (last move in house)
        if (hand == 0) {
          goAgain = true
          consolDisplay()
          turn++
        }
          
        }
        // move to oposite side
        if (side == 0) {
          side = 1
        } else {
          side = 0
        }

        // hand of board
        i = -1
      // place seed in current hole
      } else {
        board[side][i]++
        hand--

        // check if steal
        if (side == player && board[side][i] == 1 && hand == 0) {
          console.log("steal?")
          steal(i)
        }
      }
    }

    if (!goAgain) {
      endTurn()
      turn++
    }

    if (board[0].slice(0,holes).every(item => item === 0)||board[1].slice(0,holes).every(item => item === 0)) {
      console.log('gameOver')
      gameOver()
    }
  }
  consolDisplay()
}

function endTurn() {
  if (player == 1) {
    player = 0
    side = 0
  } else {
    player = 1
    side = 1
  }
  console.clear()
  console.log(board)
  console.log(house)
}
  
function gameOver() {
  if (board[0].slice(0,holes).every(item => item === 0)) {
    for (let i = 0; i < holes; i++){
      house[1] += board[1][i]
      board[1][i] = 0
    }
  }
    if (board[1].slice(0,holes).every(item => item === 0)) {
    for (let i = 0; i < holes; i++){
      house[0] += board[0][i]
      board[0][i] = 0
    }
    }
  game = false
  console.clear()
  console.log(board)
  console.log(house)
}

function consolDisplay() {
let sideMap = [7, 6, 5, 4, 3, 2, 1, 0] 

  for (side in boardDisplay) {
    boardDisplay[side].length = 0
  }
  for (let i = 0; i < holes; i++){
    boardDisplay[0].push(board[0][i])
    boardDisplay[1].push(board[1][sideMap[i]])
  }

  console.clear()
  console.log('player ' + int(player+1))
  console.log(house)
  console.log(boardDisplay[1])
  console.log(boardDisplay[0])
}

function gameDisplay() {
  let holeSize = width*.05
  let ts = holeSize * .5
  let sw = holeSize*.1
  //player indicator
  push()
  fill(0)
  textSize(ts*2)
  text("Turn "+int(turn)+" : Player " + int(player + 1), width * .5, height*.5-(holeSize*3))
  pop()

  //board
  rectMode(CENTER)
  fill(230)
  strokeWeight(sw)
  rect(width*.5, height*.5, holeSize*14, holeSize*2.5, holeSize*.5, holeSize*.5)

  // strokeWeight(holeSize*.15)
  textSize(ts)
  if (!player) {
    for (let i = 0; i < holes; i++) {
      //holes
      fill(200)
      circle(width * .25 + (width * .5 / (holes - 1)) * i, height * .5 - holeSize * .6, holeSize)
      circle(width * .25 + (width * .5 / (holes - 1)) * i, height * .5 + holeSize * .6, holeSize)

      //board numbers
      fill(0)
      // text(holes - i, width * .25 + (width * .5 / (holes - 1)) * i, height * .5 - holeSize * 1.6)
      text(i + 1, width * .25 + (width * .5 / (holes - 1)) * i, height * .5 + holeSize * 1.6)

      //seeds
      text(boardDisplay[1][i], width * .25 + (width * .5 / (holes - 1)) * i, height * .5 - holeSize * .6)
      fill(255, 0, 0)
      text(boardDisplay[0][i], width * .25 + (width * .5 / (holes - 1)) * i, height * .5 + holeSize * .6)
    }

    //houses
    fill(200)
    ellipse(width * .25 - holeSize * 1.35, height * .5, holeSize, holeSize * 2.25)
    ellipse(width * .75 + holeSize * 1.35, height * .5, holeSize, holeSize * 2.25)

    // //player label
    fill(0)
    text(int(house[1]-house[0]), width * .25 - holeSize * 1.35, height * .5 - holeSize * 1.6)
    text(int(house[0]-house[1]), width * .75 + holeSize * 1.35, height * .5 - holeSize * 1.6)

    //score
    fill(0)
    text(house[1], width * .25 - holeSize * 1.35, height * .5)
    fill(255, 0, 0)
    text(house[0], width * .75 + holeSize * 1.35, height * .5)

  //Instructions
  // text("-Move-", width * .5, hei
  } else {
    for (let i = 0; i < holes; i++) {
      //holes
      fill(200)
      circle(width * .25 + (width * .5 / (holes - 1)) * i, height * .5 - holeSize * .6, holeSize)
      circle(width * .25 + (width * .5 / (holes - 1)) * i, height * .5 + holeSize * .6, holeSize)

      //board numbers
      fill(0)
      // text(holes - i, width * .25 + (width * .5 / (holes - 1)) * i, height * .5 - holeSize * 1.6)
      text(i + 1, width * .25 + (width * .5 / (holes - 1)) * i, height * .5 + holeSize * 1.6)

      //seeds
      text(boardDisplay[0][7-i], width * .25 + (width * .5 / (holes - 1)) * i, height * .5 - holeSize * .6)
      fill(255, 0, 0)
      text(boardDisplay[1][7 - i], width * .25 + (width * .5 / (holes - 1)) * i, height * .5 + holeSize * .6)
    }

    //houses
    fill(200)
    ellipse(width * .25 - holeSize * 1.35, height * .5, holeSize, holeSize * 2.25)
    ellipse(width * .75 + holeSize * 1.35, height * .5, holeSize, holeSize * 2.25)

    // //player label
    fill(0)
    text(int(house[0]-house[1]), width * .25 - holeSize * 1.35, height * .5 - holeSize * 1.6)
    text(int(house[1]-house[0]), width * .75 + holeSize * 1.35, height * .5 - holeSize * 1.6)

    //score
    fill(0)
    text(house[0], width * .25 - holeSize * 1.35, height * .5)
    fill(255, 0, 0)
    text(house[1], width * .75 + holeSize * 1.35, height * .5)

  //Instructions
  // text("-Move-", width * .5, hei
  }
}

function contractDisplay() {
  ts = width*.025
  push()
  textAlign(LEFT,CENTER)
  fill(0)
  textSize(ts)
  text("contract ID  : " + contractID, ts + 0, ts)
  text("P1 Address : " + p1Address, ts + 0, ts*2)
  text("P2 Address : " + p2Address, ts + 0, ts*3)
  text("Seed Value : " + seedValue + " MIOTA", ts + 0, ts * 4)
  text("Total Value  : " + int(seedValue * holes * seeds * 2) + " MIOTA", ts + 0, ts*5)
  
  pop()
}

function gameStats() {
  let message = ""
  if (house[0] > house[1]) {
    message = "Player 1 Wins " + int(house[0] -house[1])
  } else if (house[0] < house[1]) {
    message = "player 2 wins " + int(house[1] -house[0])
  } else {
    message = "Tie"
  }
  // text("GameOver", width * .5, height * .5)
  text(message, width * .5, height * .5)
}

function touchControll() {
}