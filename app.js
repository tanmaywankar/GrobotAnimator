const state = {
  eyeOffset: 70,
  eyeRadius: 45,
  canvasX: 0, 
  canvasY: 0,
  canvasActualX:0,
  canvasActualY:120,
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#111";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "#000";
ctx.fillRect(0 + state.canvasX, (state.canvasActualY/2)+ state.canvasY, 320, 120);

ctx.beginPath();
ctx.arc(80, state.canvasActualY, 40, 0, Math.PI * 2);
ctx.fillStyle = "#94ff00";
ctx.fill();

ctx.beginPath();
ctx.arc(80, state.canvasActualY, 25, 0, Math.PI * 2);
ctx.fillStyle = "#000000";
ctx.fill();


ctx.beginPath();
ctx.arc(240, state.canvasActualY, 40, 0, Math.PI * 2);
ctx.fillStyle = "#94ff00";
ctx.fill();

ctx.beginPath();
ctx.arc(240, state.canvasActualY, 25, 0, Math.PI * 2);
ctx.fillStyle = "#000000";
ctx.fill();