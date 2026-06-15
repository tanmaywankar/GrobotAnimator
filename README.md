# Grobot Animator

A web-based animation editor designed as a companion for the [Grobot_Animations](https://github.com/TanmayWankar/Grobot_Animations) ESP32 library. Design emotions in the browser and instantly export C++ code for your hardware.

---

## Features

* **Real-Time Canvas Engine:** Custom-built Vanilla JS rendering for a zero-lag preview of Grobot's expressions.
* **Hardware-Accurate Simulation:** Uses a 320x240 workspace to match the exact resolution of the Grobot display.
* **Symmetry & Individual Control:** Toggle between editing the Left eye, Right eye, or Both simultaneously.
* **Instant C++ Struct Generation:** Automatically generates `MoodData` structs ready to be pasted into your Arduino/ESP32 code.
* **simple and easy:** easy for anyone to understand and use

---

## Export Format

The animator outputs code formatted specifically for the `Grobot_Animations` library:

```cpp
const MoodData MOODL = {topH, -botH, tilt, pR, eR};
const MoodData MOODR = {topH, -botH, tilt, pR, eR};
lookAt(x, y);