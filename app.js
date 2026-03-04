const state = {
  eyeRadius: 45,
  eyeGap: 20,
  eY: 60,
  canvasX: 0,
  canvasY: 0,
};

const mood = {
  topH: 0,
  botH: 0,
  tilt: 0,
  pR: 30,
  eR: 45,
};

let eyeOffset = mood.eR + state.eyeGap;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function renderEmotions() {
  //for filling black color every new frame
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //for getting sprite canvas i.e the 320 * 120 grid
  let spriteTop = state.eY + state.canvasY;
  ctx.translate(state.canvasX, spriteTop);

  //actual workable eye canvas
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 320, 120);

  drawEye(state.eY, mood.eR, mood.pR, mood.topH, mood.botH, mood.tilt, false);
  drawEye(state.eY, mood.eR, mood.pR, mood.topH, mood.botH, mood.tilt, true);
}
renderEmotions();

function drawEye(eY, eR, pR, lidH, botH, tilt, isLeft) {
  // eyes
  let eyePosition;
  if (!isLeft) {
    eyePosition = 160 + eyeOffset;
  } else {
    eyePosition = 160 - eyeOffset;
  }
  ctx.beginPath();
  ctx.arc(eyePosition, eY, eR, 0, Math.PI * 2);
  ctx.fillStyle = "#94ff00";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(eyePosition, eY, pR, 0, Math.PI * 2);
  ctx.fillStyle = "#000000";
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "#080707";
  ctx.fillRect(eyePosition - eR, (eY - eR) - 3, 2 * eR, lidH);

  ctx.beginPath();
  ctx.fillStyle = "#080707";
  ctx.fillRect(eyePosition - eR, (eY + eR) + 2, 2 * eR, botH);

  let pointX;
if (isLeft) {
    pointX = (tilt < 0) ? (eyePosition - eR) : (eyePosition + eR);
} else {
    pointX = (tilt < 0) ? (eyePosition + eR) : (eyePosition - eR);
}

ctx.beginPath();
ctx.fillStyle = "#080707";

if(tilt !== 0){
ctx.moveTo(eyePosition - eR, (eY - eR + lidH) - 3); 
ctx.lineTo(eyePosition + eR, (eY - eR + lidH) - 3); 
ctx.lineTo(pointX, eY - eR + lidH + Math.abs(tilt)); 
ctx.closePath();
ctx.fill();
}

}

function lookAt(x, y) {
  state.canvasX = x;
  state.canvasY = y;

  renderEmotions();
}

document.getElementById('lookX').addEventListener('input', (e) => {
  lookAt(parseInt(e.target.value), state.canvasY);
});

document.getElementById('lookY').addEventListener('input', (e) => {
  lookAt(state.canvasX, parseInt(e.target.value));
});


document.getElementById('topH').addEventListener('input', (e) => {
  mood.topH = parseInt(e.target.value);
  renderEmotions();
});

document.getElementById('botH').addEventListener('input', (e) => {
  mood.botH = -(parseInt(e.target.value));
  renderEmotions();
});

document.getElementById('tilt').addEventListener('input', (e) => {
  mood.tilt = parseInt(e.target.value);
  renderEmotions();
});

document.getElementById('eR').addEventListener('input', (e) => {
  mood.eR = (parseInt(e.target.value));
  renderEmotions();
});

document.getElementById('pR').addEventListener('input', (e) => {
  mood.pR = parseInt(e.target.value);
  renderEmotions();
});