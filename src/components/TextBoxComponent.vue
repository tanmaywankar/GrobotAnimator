<template>
  <textarea class="code-output"
  :value = "codeText"
  > </textarea>
</template>

<script setup>
import { computed } from "vue";
import { useSliderStore } from "../store/SliderStore";

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
</script>
