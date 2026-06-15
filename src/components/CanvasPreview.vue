<template>
    <div class="canvas-viewport">
        <canvas ref="canvasRef" width="320" height="240"></canvas>
    </div>
</template>

<script setup>
import {ref, watch, onMounted} from 'vue'
import { useSliderStore } from '../store/SliderStore';

const store = useSliderStore();
const canvasRef = ref(null);

const drawEye = (ctx, eY, eR, pR, lidH, botH, tilt, isLeft) => {
  const eyeGap = 20;
  const eyeOffset = eR + eyeGap;
  
  let eyePosition;
  if (!isLeft) {
    eyePosition = 160 + eyeOffset;
  } else {
    eyePosition = 160 - eyeOffset;
  }

  // 1. Green Iris
  ctx.beginPath();
  ctx.arc(eyePosition, eY, eR, 0, Math.PI * 2);
  ctx.fillStyle = "#08FF5A"; 
  ctx.fill();

  // 2. Black Pupil
  ctx.beginPath();
  ctx.arc(eyePosition, eY, pR, 0, Math.PI * 2);
  ctx.fillStyle = "#000000";
  ctx.fill();

  // 3. Eyelids
  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.fillRect(eyePosition - eR, eY - eR - 3, 2 * eR, lidH);

  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.fillRect(eyePosition - eR, eY + eR + 2, 2 * eR, botH);

  // 4. Tilt Modifier
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
};

const renderFrame = () => {
  if (!canvasRef.value) return; // Safety check if DOM isn't ready
  
  const ctx = canvasRef.value.getContext("2d");

  // Clear Canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  const eY = 60;
  let spriteTop = eY + store.lookState.y;
  ctx.translate(store.lookState.x, spriteTop);

  // Draw Right (Using Store Data)
  drawEye(
    ctx,
    eY,
    store.moodR.eR,
    store.moodR.pR,
    store.moodR.topH,
    store.moodR.botH,
    store.moodR.tilt,
    false
  );
  
  // Draw Left (Using Store Data)
  drawEye(
    ctx,
    eY,
    store.moodL.eR,
    store.moodL.pR,
    store.moodL.topH,
    store.moodL.botH,
    store.moodL.tilt,
    true
  );
};

watch(
  [() => store.moodL, () => store.moodR, () => store.lookState], 
  () => { renderFrame() }, 
  { deep: true }
)

onMounted(() => {
  renderFrame()
})

</script>