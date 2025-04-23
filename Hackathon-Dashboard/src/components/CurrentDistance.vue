<template>
  <div class="distance-display distance-sensor">
    <p>Distance: {{ distance }} cm</p>
  </div>
</template>

<script>
export default {
  data() {
    // return {
    //   distance: this.getRandomDistance(),
    // };
  },
  mounted() {
    // Change the distance every 5 seconds
    // this.distanceInterval = setInterval(() => {
    //   this.distance = this.getRandomDistance();
    // }, 5000);
  },
  beforeUnmount() {
    // clearInterval(this.distanceInterval);
  },
  methods: {
    // getRandomDistance() {
    //   return Math.floor(Math.random() * 500) + 1;
    // },
  },
};
</script>

<style scoped>
.distance-display {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
}
</style>
