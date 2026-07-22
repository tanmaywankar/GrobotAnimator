<template>
  <textarea class="code-output" id="text-area" :value="codeText"> </textarea>
  <div class="action-buttons">
    <button class="btn" @click="resetValues">Reset</button>
    <button class="btn">Add</button>
    <button class="btn primary"  @click = "copyCode">Copy</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useSliderStore } from "../store/SliderStore";
import { sliderConfigs } from "../config/sliderConfig";
import { toast } from 'vue3-toastify';
const store = useSliderStore();

const codeText = computed({
  get() {
    const l = store.moodL;
    const line1 = `const MoodData MOODL = {${l.topH}, ${l.botH}, ${l.tilt}, ${l.pR}, ${l.eR}};`;

    const r = store.moodR;
    const line2 = `const MoodData MOODR = {${r.topH}, ${r.botH}, ${r.tilt}, ${r.pR}, ${r.eR}};`;

    const g = store.lookState;
    const line3 = `lookAt(${g.x}, ${g.y});`;
    return `${line1}\n${line2}\n${line3}`;
  },
});

const resetValues = () => {
  for (const key of sliderConfigs) {
    if (!key.isGlobal) {
      store.moodL[key.propKey] = key.defaultValue;
      store.moodR[key.propKey] = key.defaultValue;
    } else {
      store.lookState[key.propKey] = key.defaultValue;
    }
  }
};

const copyCode = () =>{
  const textArea = document.getElementById("text-area");
  navigator.clipboard.writeText(textArea.value)
  .then(() => {
    toast.info("Code copied to clipboard!", {
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    });
  })
  .catch(err =>{
    console.error("Failed to copy text: ", err);
    toast.error("Failed to copy code", {
      autoClose: 2500,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  });
}
</script>
