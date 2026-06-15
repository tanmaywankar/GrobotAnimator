<script setup>
import "./style.css";
import CanvasPreview from "./components/CanvasPreview.vue";
import SliderComponent from "./components/SliderComponent.vue";

const sliderConfigs = [
  {
    propKey: "x", // Mapped to store.lookState.x
    isGlobal: true,
    min: -48,
    max: 48,
    defaultValue: 0,
    leftIconId: "gb-look_left",
    rightIconId: "gb-look_left",
    leftClasses: "custom left_btn oppositeX smaller_icon",
    rightClasses: "custom smaller_icon",
  },
  {
    propKey: "y", // Mapped to store.lookState.y
    isGlobal: true,
    min: -60,
    max: 60,
    defaultValue: 0,
    leftIconId: "gb-look_up",
    rightIconId: "gb-look_up",
    leftClasses: "custom left_btn smaller_icon",
    rightClasses: "custom smaller_icon oppositeY",
  },
  {
    propKey: "topH",
    isGlobal: false,
    min: 0,
    max: 50,
    defaultValue: 0,
    leftIconId: "gb-base_emo",
    rightIconId: "gb-top_lid",
    leftClasses: "custom left_btn normal_icon oppositeY",
    rightClasses: "custom normal_icon oppositeY",
  },
  {
    propKey: "botH",
    isGlobal: false,
    min: 0,
    max: 50,
    defaultValue: 0,
    leftIconId: "gb-base_emo",
    rightIconId: "gb-bottom_lid",
    leftClasses: "custom left_btn normal_icon oppositeY",
    rightClasses: "custom normal_icon oppositeY",
  },
  {
    propKey: "tilt",
    isGlobal: false,
    min: -60,
    max: 60,
    defaultValue: 0,
    leftIconId: "gb-sad",
    rightIconId: "gb-angry",
    leftClasses: "custom left_btn normal_icon",
    rightClasses: "custom normal_icon",
  },
  {
    propKey: "eR",
    isGlobal: false,
    min: 0,
    max: 50,
    defaultValue: 45,
    leftIconId: "gb-eye_small",
    rightIconId: "gb-eye_large",
    leftClasses: "custom left_btn normal_icon",
    rightClasses: "custom normal_icon",
  },
  {
    propKey: "pR",
    isGlobal: false,
    min: 0,
    max: 52,
    defaultValue: 30,
    leftIconId: "gb-pupil_small",
    rightIconId: "gb-base_emo",
    leftClasses: "custom left_btn normal_icon",
    rightClasses: "custom normal_icon",
  },
];
</script>

<template>
  <div class="app-container">
    <div class="left-panel">
      <div class="main-tabs">
        <div class="tab active">Position</div>
        <div class="tab">Presets</div>
        <div class="tab">Colour</div>
      </div>

      <div class="slider-card">
        <div class="side-tabs">
          <div class="sub-tab">L</div>
          <div class="sub-tab active-sub">B</div>
          <div class="sub-tab">R</div>
        </div>
        <SliderComponent
          v-for="slider in sliderConfigs"
          :key="slider.propKey"
          v-bind="slider"
        />
      </div>
    </div>

    <div class="right-panel">
      <div class="canvas-container">
        <CanvasPreview />
      </div>

      <div class="code-output"></div>

      <div class="action-buttons">
        <button class="btn">SEND</button>
        <button class="btn">ADD</button>
        <button class="btn primary">COPY</button>
      </div>
    </div>
  </div>
</template>
