// Biome Explorer with Arduino Web Serial control (CSV format)
// Full version with fullscreen scaling and repositioned button

let biomes = {
  farm: {
    name: 'Farm Biome',
    img: null,
    controls: [
      { color: '#6BD356', name: 'cow', img: null, sound: null },
      { color: '#3A9DDE', name: 'pig', img: null, sound: null },
      { color: '#C76BD3', name: 'rooster', img: null, sound: null },
      { color: '#E15435', name: 'tractor', img: null, sound: null }
    ]
  },
  ocean: {
    name: 'Ocean Biome',
    img: null,
    controls: [
      { color: '#6BD356', name: 'seagull', img: null, sound: null },
      { color: '#3A9DDE', name: 'dolphin', img: null, sound: null },
      { color: '#C76BD3', name: 'boat', img: null, sound: null },
      { color: '#E15435', name: 'tall-grass', img: null, sound: null }
    ]
  },
  woodland: {
    name: 'Woodland Biome',
    img: null,
    controls: [
      { color: '#6BD356', name: 'owl', img: null, sound: null },
      { color: '#3A9DDE', name: 'leaves', img: null, sound: null },
      { color: '#C76BD3', name: 'woodpecker', img: null, sound: null },
      { color: '#E15435', name: 'cardinal', img: null, sound: null }
    ]
  },

  // NEW: Space biome
  space: {
    name: 'Space Biome',
    img: null,
    controls: [
      { color: '#6BD356', name: 'alien', img: null, sound: null },
      { color: '#3A9DDE', name: 'earth', img: null, sound: null },
      { color: '#C76BD3', name: 'satellite', img: null, sound: null },
      { color: '#E15435', name: 'sun', img: null, sound: null }
    ]
  }
};

let currentBiome = 'farm';
let currentControl = -1;
let biomeKeys = ['farm', 'ocean', 'woodland', 'space'];
let imagesLoaded = false;


let smoothCursorX = null;
let smoothCursorY = null;

// Web Serial variables
let port;
let reader;
let serialConnected = false;
let connectButton;

// Joystick visualization
let joystickX = 0;
let joystickY = 0;
let mouseInFrame = true;

function preload() {
  loadImage('Images/farm-biome.png',     img => { biomes.farm.img = img;     checkImagesLoaded(); });
  loadImage('Images/ocean-biome.png',    img => { biomes.ocean.img = img;    checkImagesLoaded(); });
  loadImage('Images/woodland-biome.png', img => { biomes.woodland.img = img; checkImagesLoaded(); });
  loadImage('Images/space-biome.png',    img => { biomes.space.img = img;    checkImagesLoaded(); });

  loadImage('Images/owl.png',        img => { biomes.woodland.controls[0].img = img; });
  loadImage('Images/leaves.png',     img => { biomes.woodland.controls[1].img = img; });
  loadImage('Images/woodpecker.png', img => { biomes.woodland.controls[2].img = img; });
  loadImage('Images/cardinal.png',   img => { biomes.woodland.controls[3].img = img; });

  loadImage('Images/cow.png',     img => { biomes.farm.controls[0].img = img; });
  loadImage('Images/pig.png',     img => { biomes.farm.controls[1].img = img; });
  loadImage('Images/rooster.png', img => { biomes.farm.controls[2].img = img; });
  loadImage('Images/tractor.png', img => { biomes.farm.controls[3].img = img; });

  loadImage('Images/seagull.png',   img => { biomes.ocean.controls[0].img = img; });
  loadImage('Images/dolphin.png',   img => { biomes.ocean.controls[1].img = img; });
  loadImage('Images/boat.png',      img => { biomes.ocean.controls[2].img = img; });
  loadImage('Images/tall-grass.png',img => { biomes.ocean.controls[3].img = img; });

  loadImage('Images/alien.png',     img => { biomes.space.controls[0].img = img; });
  loadImage('Images/earth.png',     img => { biomes.space.controls[1].img = img; });
  loadImage('Images/satellite.png', img => { biomes.space.controls[2].img = img; });
  loadImage('Images/sun.png',       img => { biomes.space.controls[3].img = img; });
}

function loadSounds() {
  biomes.woodland.controls[0].sound = loadSound('Sounds/owls.wav');
  biomes.woodland.controls[1].sound = loadSound('Sounds/leaves.wav');
  biomes.woodland.controls[2].sound = loadSound('Sounds/woodpecker.wav');
  biomes.woodland.controls[3].sound = loadSound('Sounds/cardinal.mp3');

  biomes.farm.controls[0].sound = loadSound('Sounds/cow.wav');
  biomes.farm.controls[1].sound = loadSound('Sounds/pigs.mp3');
  biomes.farm.controls[2].sound = loadSound('Sounds/rooster.wav');
  biomes.farm.controls[3].sound = loadSound('Sounds/tractor.wav');

  biomes.ocean.controls[0].sound = loadSound('Sounds/seagulls.wav');
  biomes.ocean.controls[1].sound = loadSound('Sounds/dolphin.wav');
  biomes.ocean.controls[2].sound = loadSound('Sounds/boat.wav');
  biomes.ocean.controls[3].sound = loadSound('Sounds/tall-grass.wav');

  biomes.space.controls[0].sound = loadSound('Sounds/alien.mp3');
  biomes.space.controls[1].sound = loadSound('Sounds/earth.mp3');
  biomes.space.controls[2].sound = loadSound('Sounds/satellite.mp3');
  biomes.space.controls[3].sound = loadSound('Sounds/sun.mp3');
}

function checkImagesLoaded() {
  if (biomes.farm.img && biomes.ocean.img && biomes.woodland.img && biomes.space.img) {
    imagesLoaded = true;
  }
}

function setup() {
  let targetAspect = 1280 / 720;
  let canvasWidth, canvasHeight;

  if (windowWidth / windowHeight > targetAspect) {
    canvasHeight = windowHeight;
    canvasWidth = canvasHeight * targetAspect;
  } else {
    canvasWidth = windowWidth;
    canvasHeight = canvasWidth / targetAspect;
  }

  createCanvas(canvasWidth, canvasHeight);
  textFont('Courier New');
  imageMode(CORNER);

  const isEmbed = new URLSearchParams(location.search).has('embed');

  if (!isEmbed) {
    connectButton = createButton('Connect BiomeBox');
    positionConnectButton();
    connectButton.mousePressed(connectSerial);
    connectButton.style('padding', '10px 20px');
    connectButton.style('font-family', 'Courier New');
    connectButton.style('font-size', '14px');
    connectButton.style('background-color', '#1a1a1a');
    connectButton.style('color', '#96FF96');
    connectButton.style('border', '2px solid #3c3c3c');
    connectButton.style('border-radius', '8px');
    connectButton.style('cursor', 'pointer');
    connectButton.style('position', 'absolute');
    connectButton.style('z-index', '1000');
  }

  outputVolume(0.5);
  loadSounds();

  window.addEventListener('message', e => {
    if (e.data && e.data.type === 'volume') outputVolume(e.data.value);
  });

  document.addEventListener('mouseleave', () => { mouseInFrame = false; });
  document.addEventListener('mouseenter', () => { mouseInFrame = true; });
}

function positionConnectButton() {
  let canvasLeft = (windowWidth - width) / 2;
  let canvasTop = (windowHeight - height) / 2;
  let scaleFactor = width / 1280;
  let overlayBottomY = (15 + 40 + 12) * scaleFactor;

  connectButton.position(canvasLeft + width - 220 * scaleFactor, canvasTop + overlayBottomY);
}

function windowResized() {
  let targetAspect = 1280 / 720;
  let canvasWidth, canvasHeight;

  if (windowWidth / windowHeight > targetAspect) {
    canvasHeight = windowHeight;
    canvasWidth = canvasHeight * targetAspect;
  } else {
    canvasWidth = windowWidth;
    canvasHeight = canvasWidth / targetAspect;
  }

  resizeCanvas(canvasWidth, canvasHeight);

  if (connectButton) positionConnectButton();
}

async function connectSerial() {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    serialConnected = true;
    connectButton.html('BiomeBox Connected');
    connectButton.style('background-color', '#143c14');
    connectButton.style('border-color', '#64c864');

    readSerial();
    console.log('Arduino connected!');
  } catch (err) {
    console.error('Serial connection error:', err);
    connectButton.html('Connection Failed - Try Again');
  }
}

async function readSerial() {
  const textDecoder = new TextDecoderStream();
  port.readable.pipeTo(textDecoder.writable);
  reader = textDecoder.readable.getReader();

  let buffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += value;
      let lines = buffer.split('\n');
      buffer = lines.pop();

      for (let line of lines) {
        if (line.trim()) handleSerialData(line.trim());
      }
    }
  } catch (error) {
    console.error('Serial read error:', error);
  } finally {
    reader.releaseLock();
  }
}

function handleSerialData(data) {
  let parts = data.split(',');
  if (parts.length !== 7) return;

  let x = parseInt(parts[0]);
  let y = parseInt(parts[1]);
  let k0 = parseInt(parts[2]);
  let k1 = parseInt(parts[3]);
  let k2 = parseInt(parts[4]);
  let k3 = parseInt(parts[5]);
  let s = parseInt(parts[6]);

// Store joystick values for visualization (map from 0-4095 to -1 to 1)
  joystickX = -map(x, 0, 4095, -1, 1);  // flipped horizontally
  joystickY = -map(y, 0, 4095, -1, 1);  // flipped vertically


  if (s === 1) {
    let currentIndex = biomeKeys.indexOf(currentBiome);
    currentBiome = biomeKeys[(currentIndex + 1) % biomeKeys.length];
    currentControl = -1;
    stopAllSounds();
  }

  if (k0 === 1) selectControl(0);
  if (k1 === 1) selectControl(1);
  if (k2 === 1) selectControl(2);
  if (k3 === 1) selectControl(3);
}

function selectControl(index) {
  currentControl = index;
  stopAllSounds();

  let control = biomes[currentBiome].controls[index];
  if (control.sound && control.sound.isLoaded()) control.sound.loop();

  console.log(`Now playing: ${control.name}`);
}

function draw() {
  background(0);

  let scaleFactor = width / 1280;

  push();
  scale(scaleFactor);

  if (imagesLoaded && biomes[currentBiome].img) {
    image(biomes[currentBiome].img, 201, 0, 1079, 719);
  } else {
    fill(100);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Loading biome images...', 640, 360);
  }

  fill(0);
  rect(0, 0, 201, 720);

  drawNavBar();
  drawControlCards();
  drawInfoOverlay();

  if (!serialConnected) {
    if (mouseInFrame) {
      let scaleFactor = width / 1280;
      let imgX = 201 * scaleFactor;
      let imgW = 1079 * scaleFactor;
      joystickX = constrain(map(mouseX, imgX, imgX + imgW, -1, 1), -1, 1);
      joystickY = constrain(map(mouseY, 0, height, -1, 1), -1, 1);
    } else {
      joystickX = 0;
      joystickY = 0;
    }
  }
  drawJoystickIndicator();

  pop();
}

function drawJoystickIndicator() {
  // Biome image bounds in 1280x720 virtual space
  let imgX = 201;
  let imgY = 0;
  let imgW = 1079;
  let imgH = 720;

  // Padding so cursor stays inside the image
  let pad = 20;
  let minX = imgX + pad;
  let maxX = imgX + imgW - pad;
  let minY = imgY + pad;
  let maxY = imgY + imgH - pad;

  // ----- JOYSTICK → TARGET POSITION -----
  // If you had a joyScale before and it felt too fast, either remove it or set < 1
  let joyScale = 1.0; // try 0.7 or 0.5 if you want even more resistance

  let targetX = map(joystickX * joyScale, -1, 1, minX, maxX);
  let targetY = map(joystickY * joyScale, -1, 1, minY, maxY);

  // ----- RESISTANCE / EASING -----
  // Initialize smoothed cursor on first run
  if (smoothCursorX === null || smoothCursorY === null) {
    smoothCursorX = targetX;
    smoothCursorY = targetY;
  }

  // Easing factor: smaller = more resistance / slower movement
  let ease = 0.08; // try 0.05 for heavier feel, 0.15 for snappier

  smoothCursorX = lerp(smoothCursorX, targetX, ease);
  smoothCursorY = lerp(smoothCursorY, targetY, ease);

  // ----- DRIFT -----
  let driftSpeed = 0.005;

  // Let drift scale with image size so it can float more broadly if you want
  let driftAmpX = imgW * 0.15; // 15% of biome width
  let driftAmpY = imgH * 0.15; // 15% of biome height

  let driftX = map(noise(frameCount * driftSpeed, 0), 0, 1, -driftAmpX, driftAmpX);
  let driftY = map(noise(0, frameCount * driftSpeed), 0, 1, -driftAmpY, driftAmpY);

  // Final cursor position with drift
  let cursorX = constrain(smoothCursorX + driftX, minX, maxX);
  let cursorY = constrain(smoothCursorY + driftY, minY, maxY);

  // ----- CURSOR SPRITE (same PNG as control card) -----
  let controlIndex = currentControl >= 0 ? currentControl : 0;
  let control = biomes[currentBiome].controls[controlIndex];

  if (control && control.img) {
    let cursorSize = 80; // tweak for scale
    imageMode(CENTER);
    image(control.img, cursorX, cursorY, cursorSize, cursorSize);
  } else {
    // Fallback: crosshair
    stroke(150, 255, 150);
    strokeWeight(2);
    fill(0, 0, 0, 120);
    circle(cursorX, cursorY, 24);
    line(cursorX - 10, cursorY, cursorX + 10, cursorY);
    line(cursorX, cursorY - 10, cursorX, cursorY + 10);
  }
}

function drawNavBar() {
  let navY = 15;
  let navX = 240;
  let btnWidth = 140;
  let spacing = 15;

  textAlign(CENTER, CENTER);
  textSize(18);

  for (let i = 0; i < biomeKeys.length; i++) {
    let biomeKey = biomeKeys[i];
    let x = navX + i * (btnWidth + spacing);

    if (currentBiome === biomeKey) {
      fill(20, 60, 20);
      stroke(100, 200, 100);
      strokeWeight(3);
      rect(x, navY, btnWidth, 50, 8);

      noFill();
      stroke(150, 255, 150);
      rect(x + 3, navY + 3, btnWidth - 6, 44, 6);

      fill(150, 255, 150);
      noStroke();
    } else {
      fill(15);
      stroke(60);
      strokeWeight(2);
      rect(x, navY, btnWidth, 50, 8);

      fill(140);
      noStroke();
    }

    text(biomes[biomeKey].name.split(' ')[0].toUpperCase(), x + btnWidth / 2, navY + 25);
  }
}

function drawControlCards() {
  let cardWidth = 177;
  let cardHeight = 128;
  let cardPadding = 8;
  let circleSize = 40;
  let imageSize = 112;

  let startY = 80;
  let spacing = 20;
  let x = 12;

  for (let i = 0; i < 4; i++) {
    let y = startY + i * (cardHeight + spacing);
    let control = biomes[currentBiome].controls[i];

    if (currentControl === i) {
      strokeWeight(4);
      stroke(255, 255, 100);
    } else {
      strokeWeight(3);
      stroke(80);
    }

    fill(0);
    rect(x, y, cardWidth, cardHeight, 16);

    fill(control.color);
    noStroke();
    circle(x + cardPadding + circleSize / 2, y + cardPadding + circleSize / 2, circleSize);

    if (control.img) {
      image(control.img, x + cardWidth - cardPadding - imageSize, y + cardPadding, imageSize, imageSize);
    }
  }
}

function drawInfoOverlay() {
  let x = 1280 - 20;
  let y = 15;

  let infoText = biomes[currentBiome].name;
  if (currentControl >= 0) {
    infoText = 'Now Playing - ' + biomes[currentBiome].controls[currentControl].name;
  } else {
    infoText += ' - No selection';
  }

  textSize(16);
  textAlign(RIGHT, TOP);

  let txtWidth = textWidth(infoText) + 30;
  let txtHeight = 40;

  fill(0, 0, 0, 220);
  stroke(80);
  rect(x - txtWidth, y, txtWidth, txtHeight, 8);

  noFill();
  stroke(40);
  rect(x - txtWidth + 2, y + 2, txtWidth - 4, txtHeight - 4, 6);

  fill(150, 255, 150);
  noStroke();
  text(infoText.toUpperCase(), x - 15, y + txtHeight / 2 - 8);
}

function mousePressed() {
  let scaleFactor = width / 1280;
  let mx = mouseX / scaleFactor;
  let my = mouseY / scaleFactor;

  let navY = 15;
  let navX = 240;
  let btnWidth = 140;
  let spacing = 15;

  for (let i = 0; i < biomeKeys.length; i++) {
    let x = navX + i * (btnWidth + spacing);
    if (mx > x && mx < x + btnWidth && my > navY && my < navY + 50) {
      currentBiome = biomeKeys[i];
      currentControl = -1;
      stopAllSounds();
      return;
    }
  }

  let cardWidth = 177;
  let cardHeight = 128;
  let startY = 80;

  for (let i = 0; i < 4; i++) {
    let y = startY + i * (cardHeight + 20);
    if (mx > 12 && mx < 12 + cardWidth && my > y && my < y + cardHeight) {
      selectControl(i);
      return;
    }
  }
}

function stopAllSounds() {
  for (let biomeKey of biomeKeys) {
    for (let control of biomes[biomeKey].controls) {
      if (control.sound && control.sound.isPlaying()) {
        control.sound.stop();
      }
    }
  }
}
