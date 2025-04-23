<template>
  <div
    :style="{ backgroundColor: currentColor }"
    class="color-changing-component"
  >
    <p>Color Changing Component</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#FFD700"], // Array of colors to cycle through
      currentColor: "#FF5733", // Initial color
      colorIndex: 0, // To keep track of the current color index
    };
  },
  mounted() {
    // Change color every 5 seconds
    this.colorInterval = setInterval(this.changeColor, 5000);
  },
  beforeUnmount() {
    clearInterval(this.colorInterval); // Clean up when the component is destroyed
  },
  methods: {
    changeColor() {
      // Increment color index and cycle back to 0 when it reaches the end of the array
      this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      this.currentColor = this.colors[this.colorIndex];
    },
  },
};
</script>

<style scoped>
.color-changing-component {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: background-color 1s ease; /* Smooth transition for color change */
  color: white;
  font-size: 24px;
  font-weight: bold;
}
</style>
