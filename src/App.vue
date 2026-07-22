<script setup>
import "./style.css";
import CanvasPreview from "./components/CanvasPreview.vue";
import SliderComponent from "./components/SliderComponent.vue";
import { sliderConfigs } from "./config/sliderConfig.js";
import { useSliderStore } from "./store/SliderStore.js";
import TextBoxComponent from "./components/TextBoxComponent.vue";

const store = useSliderStore();
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
          <div
            class="sub-tab"
            :class="{ 'active-sub': store.activeEyeSide === 'Left' }"
            @click="store.activeEyeSide = 'Left'"
          >
            <svg class="eye_select">
              <use href="/sprite.svg#gb-left_eye" />
            </svg>
          </div>
          <div
            class="sub-tab"
            :class="{ 'active-sub': store.activeEyeSide === 'Both' }"
            @click="store.activeEyeSide = 'Both'"
          >
            <svg class = "eye_select">
            <use href = "/sprite.svg#gb-base_emo" />
           </svg>
          </div>
          <div
            class="sub-tab"
            :class="{ 'active-sub': store.activeEyeSide === 'Right' }"
            @click="store.activeEyeSide = 'Right'"
          >
            <svg class="eye_select">
              <use href="/sprite.svg#gb-right_eye" />
            </svg>
          </div>
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
      <TextBoxComponent />
    </div>
  </div>
</template>
