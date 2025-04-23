<template>
  <div
    class="color-changing-component color-sensor"
  >
    <p>Color Sensor</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentColor: "#000000", // Black color
    };
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
