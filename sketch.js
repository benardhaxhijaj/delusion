let f = 0; // Used for animation
let song;
let fft;
let colors;
let maxDiameter;

function preload() {
  song = loadSound("./mzk/CM_01 Pistachios.mp3"); // Replace with the path to your MP3 file
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  song.play();
  fft = new p5.FFT();
  colors = [
    color(255, 204, 0, 150),
    color(255, 0, 150, 150),
    color(0, 255, 255, 150),
  ];
  maxDiameter = min(windowWidth, windowHeight) / 2;
}

function draw() {
  background(0);

  let spectrum = fft.analyze();
  let bass = fft.getEnergy("bass");
  let treble = fft.getEnergy("treble");
  let mid = fft.getEnergy("mid");

  // Map the energy levels to diameters
  let bassDiameter = map(bass, 0, 255, 0, maxDiameter);
  let trebleDiameter = map(treble, 0, 255, 0, maxDiameter);
  let midDiameter = map(mid, 0, 255, 0, maxDiameter);

  // Calculate positions and draw elements
  for (let i = 0; i < TAU; i += PI / 16) {
    let r = bassDiameter / 2;
    let x = sin(f + i) * r + windowWidth / 2;
    let y = cos(f + i) * r + windowHeight / 2;

    // Draw circles with changing colors based on the music
    fill(colors[0]);
    circle(x, y, trebleDiameter / 20);

    // Draw lines that react to the mid frequencies
    stroke(colors[1]);
    line(x, y, windowWidth / 2, windowHeight / 2);

    // Draw outer circles that react to the bass frequencies
    fill(colors[2]);
    circle(windowWidth / 2, windowHeight / 2, bassDiameter / 20);
  }

  f += 0.01; // Animate by increasing the value
}
