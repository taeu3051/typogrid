var gridSketch = function(p) {
  var fonts = ["Futura", "Didot","Verdana","Baskerville", "Avenir", "Gill Sans", "Source Code Pro", "Cooper", "Helvetica", "Rockwell", "Didot"];

  let size=800;

  var index;
  let offscreen,mask;
  let inputString = 'type something..';
  let fontGrid;
  let h;
  let rows = 4;
  let cols = 10;
  let backgroundColor = p.color(255, 255, 255); 
  let textColor = p.color(19, 20, 6);
  let lastMouseMoveTime = 0;
  let mouseMoveInterval = 100;
  let debounceTimeout;
  let animationInterval = 500;
  let lastAnimationTime = 0;

  const colorCombinations = [
    { bg: [222, 10, 20], text: [255, 255, 255] },
    { bg: [222, 10, 20], text: [0, 0, 0] },
    { bg: [117, 222, 84], text: [19, 20, 6] },
    { bg: [6, 130, 71], text: [245, 241, 244] },
    { bg: [255, 243, 44], text: [0, 0, 0] },
    { bg: [254, 203, 10], text: [220, 70, 10] },
    { bg: [240, 73, 49], text: [249, 196, 199] },
    { bg: [232, 80, 10], text: [212, 214, 204] },
    { bg: [198, 115, 72], text: [113, 2, 19] },
    { bg: [2, 93, 97], text: [242, 204, 167] },
    { bg: [28, 89, 210], text: [254, 65, 46] },
    { bg: [197, 22, 85], text: [72, 2, 197] },
    { bg: [185, 39, 168], text: [11, 155, 44] },
    { bg: [27, 2, 94], text: [233, 32, 92] },
    { bg: [0, 0, 142], text: [255, 254, 252] },
    { bg: [229, 223, 56], text: [229, 223, 56] },
    { bg: [139, 244, 178], text: [28, 55, 18] },
    { bg: [120, 88, 74], text: [249, 32, 175] },
    { bg: [29, 65, 29], text: [43, 229, 148] },
    { bg: [240, 162, 249], text: [12, 50, 84] },
    { bg: [245, 113, 168], text: [168, 26, 20] },
    { bg: [170, 18, 68], text: [98, 162, 198] },
    { bg: [13, 66, 2], text: [46, 216, 212] },
    { bg: [64, 53, 191], text: [246, 152, 197] },
    { bg: [97, 104, 134], text: [248, 232, 13] },
    { bg: [34, 20, 8], text: [225, 41, 250] },
    { bg: [102, 207, 24], text: [231, 2, 2] },
    { bg: [192, 10, 119], text: [151, 253, 113] },
    { bg: [151, 213, 178], text: [151, 213, 178] },
    { bg: [238, 37, 9], text: [85, 146, 25] },
    { bg: [252, 172, 240], text: [19, 170, 136] },
    { bg: [198, 79, 249], text: [238, 21, 141] },
    { bg: [75, 182, 15], text: [157, 21, 91] },
    { bg: [212, 214, 204], text: [19, 20, 6] },
    { bg: [19, 20, 6], text: [212, 214, 204] }
  ];

  let randomTexts = [
    "This webpage showcases a dynamic grid of fonts. You can interact with the grid by moving your mouse or pressing keys.",
    "",
    "Use arrow keys to adjust rows and columns. Move the mouse to change colors. Click on a cell to change its font.",
    "",
    "Press Shift+S to save the grid as an image. Share it on Instagram @roomtempstorage. Created by KIMTAEWOO."
  ];
  let robotoFont;

  p.preload = function() {
    robotoFont = p.loadFont('https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf');
  }

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    offscreen = p.createGraphics(p.windowWidth, p.windowHeight);
    mask = p.createGraphics(p.windowWidth, p.windowHeight);
    offscreen.textAlign(p.CENTER, p.CENTER);
    p.textFont(robotoFont);

    backgroundColor = p.color(255, 255, 255);
    textColor = p.color(19, 20, 6);
    scramble();
  }

  function scramble() {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(() => {
      fontGrid = new Array();
      for(var j = 0; j <= rows; j++) {
        fontGrid[j] = new Array();
        for(var i = 0; i<cols; i++)
          fontGrid[j].push(fonts[floor(p.random(0, fonts.length))]);
      }
      getHeight();
      drawGraphic();
    }, 100);
  }

  function getHeight() {
    var x=0;
    for(var i=0;i<fonts.length;i++) {
      offscreen.textFont(fonts[i]);
      offscreen.textSize(p.windowWidth);
      offscreen.textSize(p.windowWidth*p.windowWidth/offscreen.textWidth(inputString));
      x=Math.max(x,offscreen.textAscent());
    }
    h=x;
  }

  function getSector(row,col) {
    var out = p.createGraphics(p.floor(p.windowWidth/cols), p.floor(h/rows));
    out.fill(p.color(textColor));
    out.textFont(fontGrid[row][col]);
    out.textSize(p.windowWidth);
    out.textAlign(p.CENTER, p.CENTER);
    out.textSize(p.windowWidth*p.windowWidth/out.textWidth(inputString));
    out.text(inputString, p.windowWidth/2-col*p.windowWidth/cols, h/2-row*h/rows);
    return out.get();
  }

  p.keyPressed = function() {
    if (p.keyCode === p.UP_ARROW) {
      rows = p.constrain(rows + 1, 1, 10);
      scramble();
    } else if (p.keyCode === p.DOWN_ARROW) {
      rows = p.constrain(rows - 1, 1, 10);
      scramble();
    } else if (p.keyCode === p.LEFT_ARROW) {
      cols = p.constrain(cols - 1, 1, 30);
      scramble();
    } else if (p.keyCode === p.RIGHT_ARROW) {
      cols = p.constrain(cols + 1, 1, 30);
      scramble();
    } else if (p.keyCode === p.BACKSPACE) {
      inputString = inputString.slice(0, -1);
      scramble();
    }
  }

  p.keyTyped = function() {
    if (p.key === 'S' && p.keyIsDown(p.SHIFT)) {
      p.saveCanvas('grid', 'png');
    } else if (p.key >= 'a' && p.key <= 'z' || p.key >= 'A' && p.key <= 'Z') {
      if (inputString === 'type something..') {
        inputString = '';
      }
      inputString += p.key;
      scramble();
    }
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    scramble();
  }

  p.mouseMoved = function() {
    let currentTime = p.millis();
    if (currentTime - lastMouseMoveTime > mouseMoveInterval) {

      let colors = p.random(colorCombinations);
      textColor = p.color(colors.text);
      backgroundColor = p.color(colors.bg);
      drawGraphic();
      lastMouseMoveTime = currentTime;
    }
  }

  p.mousePressed = function() {
    let col = p.floor(p.mouseX / (p.windowWidth / cols));
    let row = p.floor((p.mouseY - (p.windowHeight / 2 - h / 2) + 50) / (h / rows));
    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      fontGrid[row][col] = fonts[p.floor(p.random(0, fonts.length))];
      drawGraphic();
    }
  }

  p.draw = function() {
    let currentTime = p.millis();
    if (inputString === 'type something..' && currentTime - lastAnimationTime > animationInterval) {

      scramble();
      lastAnimationTime = currentTime;
    }
  }

  function drawGraphic() {
    p.clear();
    p.background(backgroundColor);  
    p.fill(textColor);
    p.textSize(32);

    for(var row=0;row<rows;row++)
      for(var col=0;col<cols;col++) {
        p.image(getSector(row,col),col*p.windowWidth/cols,p.windowHeight/2-h/2+row*h/rows - 50, p.windowWidth/cols,h/rows);
      }

    let boxWidth = p.windowWidth / 5 - 30; 
    let boxHeight = 60; 
    p.textSize(12);
    let lineHeight = 14;
    for (let i = 0; i < 5; i++) {
      p.fill(textColor); 
      p.noStroke(); 
      p.fill(textColor);
      p.textAlign(p.LEFT, p.TOP);
      let words = randomTexts[i].split(' ');
      let line = '';
      let y = p.windowHeight - boxHeight + 10;
      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let testWidth = p.textWidth(testLine);
        if (testWidth > boxWidth - 20 && n > 0) {
          p.text(line, i * (boxWidth + 30) + 10, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      p.text(line, i * (boxWidth + 30) + 10, y);
    }
  }
};