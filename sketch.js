let hex = [];
let song;
let fft;
let r;
let r1, g1, b1, f, p, q;

function preload() {
  song = loadSound("./mzk/CM_09 Softy.mp3");
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
  r = random(width / 100, width / 70);
  hexPopulate();
  strokeWeight(1);
  background(10, 30, 40);
  r1 = random(0, 40);
  g1 = random(0, 40);
  b1 = random(0, 40);
  f = random(2, 9);
  p = int(random(-4, 4));
  q = int(random(-2, 2));

  fft = new p5.FFT();
  song.play();
}

function draw() {
  background(10, 30, 40, 10);

  translate(width / 2, height / 2);
  push();
  let t = millis() / 500;
  scale(1 + 0.5 * sin(t));
  rotate(t / f);
  hexagon(r, color(10, 30, 40), color(10, 30, 40));
  for (let j = 0; j < hex.length; j++) {
    let col1 = color(
      10 + 100 * sin(j + t) * sin(j + t) + r1,
      30 + 220 * sin(j + t) * sin(j + t) + g1,
      50 + 240 * sin(j + t) * sin(j + t) + b1,
      100 + 100 * sin(j + t)
    );
    let col2 = color(
      10 + 50 * cos(j + t) * cos(j + t) + r1,
      30 + 180 * cos(j + t) * cos(j + t) + g1,
      40 + 180 * cos(j + t) * cos(j + t) + b1
    );
    push();
    rotate(hex[j].angle);
    translate(hex[j].transX + 5 * r * sin(t), hex[j].transY + 5 * r * sin(t));
    rotate(hex[j].angle2);
    translate(2 * hex[j].transX, p * hex[j].transX - q * hex[j].transY);
    let spectrum = fft.analyze();
    let frequencyIndex = floor(map(j, 0, hex.length, 0, spectrum.length));
    let brightness = map(spectrum[frequencyIndex], 0, 255, 50, 200);
    col1.setAlpha(brightness);
    col2.setAlpha(brightness);
    hexagon(r, col1, col2);
    pop();
  }
  pop();

  border();
}

function hexagon(r, col1, col2) {
  stroke(col2);
  fill(col1);
  beginShape();
  for (let i = 0; i <= 6; i++) {
    vertex(r * cos(i * 60), r * sin(i * 60));
  }
  endShape(CLOSE);
}

function hexPopulate() {
  let cnt = 0;
  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 8; i++) {
      hex[cnt] = {
        angle: i * 60,
        angle2: 0,
        transX: 0,
        transY: r * sqrt(3) * j,
        group: 1,
      };
      cnt++;
      hex[cnt] = {
        angle: i * 60 + 30,
        angle2: 30,
        transX: 0,
        transY: r * 3 * j,
        group: 2,
      };
      cnt++;
      hex[cnt] = {
        angle: i * 60,
        angle2: 0,
        transX: 3 * r,
        transY: r * sqrt(3) * (j + 2),
        group: 3,
      };
      cnt++;
      hex[cnt] = {
        angle: i * 60,
        angle2: 0,
        transX: r * 1.5,
        transY: (r * sqrt(3)) / 2 + r * sqrt(3) * (j + 2),
        group: 4,
      };
      cnt++;
      hex[cnt] = {
        angle: i * 60,
        angle2: 0,
        transX: -r * 1.5,
        transY: (r * sqrt(3)) / 2 + r * sqrt(3) * (j + 3),
        group: 5,
      };
      cnt++;
      hex[cnt] = {
        angle: i * 60,
        angle2: 0,
        transX: -r * 3,
        transY: r * sqrt(3) + r * sqrt(3) * (j + 3),
        group: 6,
      };
    }
  }
}

function border() {
  push();
  noFill();
  stroke(20, 50, 60);
  strokeWeight(4);
  rect(0, 0, width - 20, height - 20);
  pop();
}

function keyPressed() {
  save(cnv, "hex", "jpg");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
