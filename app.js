const state = {
  eyeGap: 20,
  eY: 60,
  canvasX: 0,
  canvasY: 0,
};

let moodL = {
  topH: 0,
  botH: 0,
  tilt: 0,
  pR: 30,
  eR: 45,
};

let moodR = {
  topH: 0,
  botH: 0,
  tilt: 0,
  pR: 30,
  eR: 45,
};

let defaultValue = {
  topH: 0,
  botH: 0,
  tilt: 0,
  pR: 30,
  eR: 45,
};

let eyeOffset = moodL.eR + state.eyeGap;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let textbox = document.getElementById("codeOutput");

function renderEmotions() {
  //for filling black color every new frame
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //for getting sprite canvas i.e the 320 * 120 grid
  let spriteTop = state.eY + state.canvasY;
  ctx.translate(state.canvasX, spriteTop);

  //actual workable eye canvas
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 320, 120);

  drawEye(
    state.eY,
    moodR.eR,
    moodR.pR,
    moodR.topH,
    moodR.botH,
    moodR.tilt,
    false,
  );
  drawEye(
    state.eY,
    moodL.eR,
    moodL.pR,
    moodL.topH,
    moodL.botH,
    moodL.tilt,
    true,
  );

  textbox.value = `const MoodData MOODL = {${moodL.topH}, ${-moodL.botH}, ${moodL.tilt}, ${moodL.pR}, ${moodL.eR}};\nconst MoodData MOODR = {${moodR.topH}, ${-moodR.botH}, ${moodR.tilt}, ${moodR.pR}, ${moodR.eR}};\nlookAt(${state.canvasX},${state.canvasY});
  `;
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
  ctx.fillStyle = "#08FF5A";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(eyePosition, eY, pR, 0, Math.PI * 2);
  ctx.fillStyle = "#000000";
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.fillRect(eyePosition - eR, eY - eR - 3, 2 * eR, lidH);

  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.fillRect(eyePosition - eR, eY + eR + 2, 2 * eR, botH);

  let pointX;
  if (isLeft) {
    pointX = tilt < 0 ? eyePosition - eR : eyePosition + eR;
  } else {
    pointX = tilt < 0 ? eyePosition + eR : eyePosition - eR;
  }

  ctx.beginPath();
  ctx.fillStyle = "#000000";

  if (tilt !== 0) {
    ctx.moveTo(eyePosition - eR, eY - eR + lidH - 3);
    ctx.lineTo(eyePosition + eR, eY - eR + lidH - 3);
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

document.getElementById("lookX").addEventListener("input", (e) => {
  lookAt(parseInt(e.target.value), state.canvasY);
});

document.getElementById("lookY").addEventListener("input", (e) => {
  lookAt(state.canvasX, parseInt(e.target.value));
});

document.getElementById("topH").addEventListener("input", (e) => {
  updateMood("topH", parseInt(e.target.value));
});

document.getElementById("botH").addEventListener("input", (e) => {
  updateMood("botH", -parseInt(e.target.value));
});

document.getElementById("tilt").addEventListener("input", (e) => {
  updateMood("tilt", parseInt(e.target.value));
});

document.getElementById("eR").addEventListener("input", (e) => {
  updateMood("eR", parseInt(e.target.value));
});

document.getElementById("pR").addEventListener("input", (e) => {
  updateMood("pR", parseInt(e.target.value));
});

function updateMood(property, value) {
  const selectedOption = document.querySelector(
    'input[name="eyeSide"]:checked',
  );
  const side = selectedOption.value;

  if (side == "left" || side == "both") {
    moodL[property] = value;
  }
  if (side == "right" || side == "both") {
    moodR[property] = value;
  }
  renderEmotions();
}

async function copyCode() {
  const code = document.getElementById("codeOutput").value;

  try {
    await navigator.clipboard.writeText(code);
    showToast("Code copied to clipboard!");
  } catch (err) {
    showToast("Failed to copy!", "error");
  }
}

function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  container.appendChild(toast);

  // Remove the element from DOM after the animation finishes
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

const allButton = document.querySelectorAll(".custom");
allButton.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const parentCard = btn.closest(".slider_card");
    const slider = parentCard.querySelector('input[type="range"]');
    if (slider) {
      let currentValue = Number(slider.value);

      slider.value = btn.classList.contains("left_btn")
        ? currentValue - 2
        : currentValue + 2;
      slider.dispatchEvent(new Event("input"));
    }
  });
});

const allSlider = document.querySelectorAll('input[type="range"]');
allSlider.forEach((slider) => {
  slider.addEventListener("dblclick", (e) => {
    e.target.value = defaultValue[slider.id];
    slider.dispatchEvent(new Event("input"));
  });
});

function resetEyes() {
  moodL = { ...defaultValue };
  moodR = { ...defaultValue };
  state.canvasX = 0;
  state.canvasY = 0;
  const allSliders = document.querySelectorAll('input[type="range"]');

  allSliders.forEach((slider) => {
    if (defaultValue.hasOwnProperty(slider.id)) {
      slider.value = defaultValue[slider.id];
    } else if (slider.id === "lookX" || slider.id === "lookY") {
      slider.value = 0;
    }
  });

  const defaultRadio = document.querySelector(
    'input[name="eyeSide"][value="both"]',
  );

  if (defaultRadio) {
    defaultRadio.checked = true;
  }
  renderEmotions();
}

// for the preset tab

function savePreset() {
  const presetName = prompt("Enter the name for preset", "Neutral");
  if (!presetName) return;
  const newPreset = {
    id: Date.now(),
    name: presetName,
    moodL: { ...moodL },
    moodR: { ...moodR },
    look: { x: state.canvasX, y: state.canvasY },
  };
  const existingPreset = JSON.parse(localStorage.getItem("grobot_presets")) || [];
  existingPreset.push(newPreset);
  localStorage.setItem("grobot_presets", JSON.stringify(existingPreset));
  showToast(`${presetName} saved as a preset`);
}

function loadPreset(name){
const Presets = JSON.parse(localStorage.getItem("grobot_presets")) || [];
const found = Presets.find(p => p.name.toLowerCase() === name.toLowerCase());
if(found){
  moodL = {...found.moodL};
  moodR = {...found.moodR};
  state.canvasX = found.look.x;
  state.canvasY = found.look.y;

  document.getElementById("lookX").value = state.canvasX;
  document.getElementById("lookY").value = state.canvasY;
  document.getElementById("topH").value = moodL.topH;
  document.getElementById("botH").value = -moodL.botH;
  document.getElementById("tilt").value = moodL.tilt;
  document.getElementById("eR").value = moodL.eR;
  document.getElementById("pR").value = moodL.pR;

  renderEmotions();
}
}
