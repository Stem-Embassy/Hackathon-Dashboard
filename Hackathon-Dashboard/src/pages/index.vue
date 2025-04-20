<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<!-- eslint-disable vue/html-self-closing -->

<template>
  <div class="countdown-wrapper">
    <div class="logo-container">
      <img
        class="logo"
        src="https://images.squarespace-cdn.com/content/v1/62100392b06da21d57a55522/f5d86703-4cb1-4319-97f4-f130d9fea4e3/The+STEM+Embassy.png?format=1500w"
        alt="The STEM Embassy Logo"
      />
    </div>

    <div class="countdown-banner">
      <h1>Shoreline Showdown Countdown</h1>
      <h3>Time till event</h3>
      <div v-if="timeLeft" class="countdown-clock">
        <span>{{ timeLeft.days }}</span
        >:<span>{{ timeLeft.hours }}</span
        >:<span>{{ timeLeft.minutes }}</span
        >:<span>{{ timeLeft.seconds }}</span>
      </div>
      <div v-else>
        <p>TIME'S UP!</p>
      </div>
    </div>
  </div>

  <v-container class="billboard MainColor" fluid>
    <div class="billboard-content">
      <!-- heading -->
      <h1 class="display-3 font-weight-bold mb-4">
        Welcome to the Shoreline Showdown!
      </h1>
      <!-- description -->
      <p class="subtitle-1 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        feugiat dui non risus placerat, a vulputate magna dictum. Join us for an
        unforgettable experience!
      </p>
    </div>
  </v-container>

  <v-container class="billboard" fluid>
    <div class="billboard-content">
      <!-- heading -->
      <h1 class="display-3 font-weight-bold mb-4">Welcome to Our Event!</h1>
      <!-- description -->
      <p class="subtitle-1 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        feugiat dui non risus placerat, a vulputate magna dictum. Join us for an
        unforgettable experience!
      </p>
    </div>
  </v-container>

  <v-container class="billboard SecondaryColor" fluid>
    <div class="billboard-content">
      <!-- heading -->
      <h1 class="display-3 font-weight-bold mb-4">Welcome to Our Event!</h1>
      <!-- description -->
      <p class="subtitle-1 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        feugiat dui non risus placerat, a vulputate magna dictum. Join us for an
        unforgettable experience!
      </p>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      targetDate: "2025-03-18T20:00:00", // hardcoded target date
      timeLeft: null,
      timer: null,
    };
  },
  mounted() {
    this.startCountdown();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    startCountdown() {
      const targetTime = new Date(this.targetDate).getTime();

      this.timer = setInterval(() => {
        const now = Date.now();
        const diff = targetTime - now;

        if (diff <= 0) {
          this.timeLeft = null;
          clearInterval(this.timer);
        } else {
          this.timeLeft = {
            days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
              2,
              "0"
            ),
            hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
              2,
              "0"
            ),
            minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
              2,
              "0"
            ),
            seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
          };
        }
      }, 1000);
    },
  },
};
</script>

<style>
/*COUNTDOWN TIMER CSS */
.countdown-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center; /* horizontally center */
  margin-top: 20px; /* adjust as needed for vertical spacing */
  margin-bottom: 1%;
}

/* logo section */
.logo-container {
  margin-bottom: 1rem;
}

.logo {
  width: 120px;
  height: auto;
}

/* banner styling */
.countdown-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #272929; /* green gradient */
  color: lightgrey;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
}

/* clock-like countdown */
.countdown-clock {
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
}

.countdown-clock span {
  color: lightgrey; /* yellow for the numbers */
}

/* BANNER CSS*/
.billboard {
  min-height: 100vh;
  display: flex;
  justify-content: center; /* horizontally centers the content */
  align-items: center; /* vertically centers the content */
}

/* content container */
.billboard-content {
  text-align: center; /* centers the text and elements */
  max-width: 800px; /* limits content width for readability */
  padding: 20px; /* adds space around the content */
}

.billboard-image {
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
</style>
