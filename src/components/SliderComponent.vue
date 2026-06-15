<template>
    <div class="slider-row">
        <svg :class="leftClasses">
            <use :href="`/sprite.svg#${leftIconId}`" />
        </svg>
        <input type="range" :min="min" :max="max" />
        <svg :class="rightClasses">
            <use :href="`/sprite.svg#${rightIconId}`" />
        </svg>
    </div>
</template>

<script setup>
const props = defineProps({
  propKey: String,
  isGlobal: Boolean,
  min: Number,
  max: Number,
  defaultValue: Number,
  leftIconId: String, 
  rightIconId: String, 
  leftClasses: String, 
  rightClasses: String 
})
</script>

<style scoped>

.custom {
  color: #51b6f5;
  cursor: pointer;
  pointer-events: auto;
}

/* Prevents the SVG paths from stealing clicks */
.custom use {
  pointer-events: none;
}

.normal_icon {
  width: 40px;
  height: 40px;
  padding: 5px;
  transition: 0.1s all;
  flex-shrink: 0;
  box-sizing: content-box;
}

.normal_icon:active {
  border-radius: 10px;
  background-color: #2b3038;
}

.smaller_icon {
  width: 48px;
  height: 48px;
  padding: 1px;
  transition: 0.1s all;
  flex-shrink: 0;
  box-sizing: content-box;
}

.smaller_icon:active {
  border-radius: 10px;
  background-color: #2b3038;
}

.oppositeY {
  transform: scaleY(-1);
}

.oppositeX {
  transform: scaleX(-1);
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  background: transparent;
  outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  background: #1444a3ac;
  border-radius: 3px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background: #ccc;
  margin-top: -10px;
  cursor: pointer;
  border: 2px solid #1b1f13;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}
</style>