<template>
  <v-container>
    <div class="key-visualizer">
      <v-row justify="center" align="center">
        <v-col>
          <div class="key-row">
            <div :class="{ key: true, active: pressedKeys['o'] }">O</div>
          </div>
          <div class="key-row">
            <div :class="{ key: true, active: pressedKeys['l'] }">L</div>
          </div>
        </v-col>

        <v-col>
          <v-card class="mt-6 pa-4">
            <div class="text-center text-h6 mb-2">Value: {{ value }}</div>
            <v-progress-linear
              :model-value="progressValue"
              color="primary"
              height="20"
              rounded
            >
              <template v-slot:default="{ value }">
                <strong>{{ Math.round((value / 100) * 200) }}</strong>
              </template>
            </v-progress-linear>
            <div class="d-flex justify-space-between mt-1">
              <span>0</span>
              <span>200</span>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const keys = ["o", "l"];
const emit = defineEmits(["servo-data"]);

const pressedKeys = ref({
  o: false,
  l: false,
});

const value = ref(90); // Starting in the middle (90)
const MIN_VALUE = 0;
const MAX_VALUE = 200;
const STEP = 40;

const progressValue = computed(() => {
  return (value.value / MAX_VALUE) * 100;
});

const handleKeyDown = (event) => {
  const key = event.key.toLowerCase();

  if (keys.includes(key)) {
    if (pressedKeys.value[key] !== true) {
      pressedKeys.value[key] = true;

      // Update the value based on key press
      if (key === "o") {
        // Increase value by STEP, but don't exceed MAX_VALUE
        value.value = Math.min(value.value + STEP, MAX_VALUE);
      } else if (key === "l") {
        // Decrease value by STEP, but don't go below MIN_VALUE
        value.value = Math.max(value.value - STEP, MIN_VALUE);
      }

      handleOutput(key);
    }
  }
};

const handleKeyUp = (event) => {
  const key = event.key.toLowerCase();

  if (keys.includes(key)) {
    pressedKeys.value[key] = false;
    emit("servo-data", value.value);
  }
};

const handleOutput = (key) => {
  console.log(`Key pressed: ${key}, Current value: ${value.value}`);
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

<style scoped>
.key-visualizer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.key-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 5px;
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
  background-color: #1867c0; /* Vuetify primary color */
  color: white; /* pressed key text color */
  border-color: #0d47a1; /* darker border when active */
}
</style>
