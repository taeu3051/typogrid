var sourceText = "typography";
var curIndex = 0;
var frameCount = 0;
var sourceFonts = ['Georgia', 'Helvetica', 'Courier', 'Times', 'Verdana', 'Trebuchet MS', 'Palatino', 'Garamond', 'Impact'];
var centerFonts = ['Helvetica', 'Arial', 'Lato', 'Roboto'];
var bgColor, textColor;
var centerText = "Good design begins with the right type—what will you create today?";
var sourceTextSize = 200;
var centerTextFont;

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

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('intro');
  frameRate(5);
  
  let colors = random(colorCombinations);
  bgColor = color(colors.bg);
  textColor = color(colors.text);
  
  centerTextFont = random(centerFonts);

  canvas.mousePressed(handleClick);
}

function draw() {
  if (frameCount % 30 === 0) {
    let colors = random(colorCombinations);
    bgColor = color(colors.bg);
    textColor = color(colors.text);
  }
  background(bgColor);
  fill(textColor);

  if (frameCount % 5 === 0) {
    sourceTextSize = random(200, 700);
  }

  textFont(random(sourceFonts));
  frameCount++;

  textAlign(CENTER, CENTER);
  push();

  translate(mouseX, mouseY);
  rotate(random(-PI / 4, PI / 4));

  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = 5;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'rgba(0, 0, 0, 0)';
  textSize(sourceTextSize);
  text(sourceText.substring(curIndex, curIndex + 1), 0, 0);
  pop();


  textSize(20);
  textFont(centerTextFont);
  text(centerText, width / 2, height / 2);

  curIndex++;
  if (curIndex >= sourceText.length) {
    curIndex = 0;
  }
}

function handleClick() {
  document.getElementById('intro').style.transform = 'translateY(100%)';
  setTimeout(() => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('grid').style.display = 'block';
    window.scrollTo(0, 0); 

    new p5(gridSketch, 'grid');
  }, 1000); 
}