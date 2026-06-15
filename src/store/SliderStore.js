import { defineStore } from "pinia";
import { reactive } from "vue";
import { ref } from "vue";
import { computed } from "vue";

export const useSliderStore = defineStore('SliderStore',() => {
    const moodL = reactive({
    topH: 0,
    botH: 0,
    tilt: 0,
    pR: 30,
    eR: 45,
    });
    const moodR = reactive({
    topH: 0,
    botH: 0,
    tilt: 0,
    pR: 30,
    eR: 45,
    });

    const lookState = reactive({
        x: 0,
        y: 0
    });

    const activeEyeSide = ref("both");

    return{
        moodL,
        moodR,
        lookState,
        activeEyeSide
    };
})