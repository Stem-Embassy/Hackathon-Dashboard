<template>
  <div class="key-visualizer">
    <div class="key-row">
      <div :class="{ key: true, active: pressedKeys['w'] }">W</div>
    </div>
    <div class="key-row">
      <div :class="{ key: true, active: pressedKeys['a'] }">A</div>
      <div :class="{ key: true, active: pressedKeys['s'] }">S</div>
      <div :class="{ key: true, active: pressedKeys['d'] }">D</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const keys = ["w", "a", "s", "d"];
const emit = defineEmits(["controller-data"]);

const pressedKeys = ref({
  w: false,
  a: false,
  s: false,
  d: false,
});

const handleKeyDown = (event) => {
  if (keys.includes(event.key.toLowerCase())) {
    if (pressedKeys.value[event.key.toLowerCase()] != true) {
      pressedKeys.value[event.key.toLowerCase()] = true;
      handleOutput(event.key.toLowerCase());
      emit("controller-data", pressedKeys);
    }
  }
};

const handleKeyUp = (event) => {
  if (keys.includes(event.key.toLowerCase())) {
    pressedKeys.value[event.key.toLowerCase()] = false;
    emit("controller-data", pressedKeys);
  }
};

const handleOutput = (key) => {
  console.log(key);
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
});
</script>

<style>
.key-visualizer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.key-row {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.key {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  background-color: #f5f5f5; /* default key color */
  color: #000; /* default text color */
  transition: background-color 0.2s ease, color 0.2s ease;
}

.key.active {
  background-color: #ff5722; /* pressed key background color */
  color: white; /* pressed key text color */
  border-color: #d84315; /* optional: change border color when active */
}
</style>
