<!-- eslint-disable vue/html-self-closing -->
<template>
  <v-container fluid>
    <v-row justify="center" class="logo-container">
      <img
        src="https://images.squarespace-cdn.com/content/v1/62100392b06da21d57a55522/f5d86703-4cb1-4319-97f4-f130d9fea4e3/The+STEM+Embassy.png?format=1500w"
        alt="Logo"
        class="logo"
      />
    </v-row>

    <v-row>
      <v-navigation-drawer app permanent>
        <v-list dense>
          <v-list-item href="#topic-0">
            <v-list-item-content>
              <v-list-item-title>Introduction</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-2"></v-divider>
          <!-- Basics of Programming Category -->
          <v-subheader class="mt-2 font-weight-bold"
            >BASICS OF PROGRAMMING</v-subheader
          >
          <v-list-item href="#topic-1">
            <v-list-item-content>
              <v-list-item-title>Variables</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item href="#topic-2">
            <v-list-item-content>
              <v-list-item-title>Lists</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item href="#topic-3">
            <v-list-item-content>
              <v-list-item-title>Operators</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item href="#topic-4">
            <v-list-item-content>
              <v-list-item-title>Functions</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item href="#topic-5">
            <v-list-item-content>
              <v-list-item-title>Loops</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item href="#topic-6">
            <v-list-item-content>
              <v-list-item-title>Conditionals</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- Robot Controls Category -->
          <v-divider class="my-2"></v-divider>
          <v-subheader class="font-weight-bold">ROBOT CONTROLS</v-subheader>
          <v-list-item href="#topic-7">
            <v-list-item-content>
              <v-list-item-title>Drive Train</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item href="#topic-8">
            <v-list-item-content>
              <v-list-item-title>Websockets</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item href="#topic-9">
            <v-list-item-content>
              <v-list-item-title>Sensors</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-col cols="9" class="main-content">
        <div id="topic-0" class="topic-section">
          <h2>Introduction</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            tincidunt, nisi a hendrerit pharetra, diam mauris semper lorem, quis
            porttitor dolor sapien sed nisi. Sed quis erat nulla. Mauris eu arcu
            nisl. Morbi dolor orci, egestas eget suscipit quis, eleifend nec mi.
            Integer dignissim sapien elit, eget hendrerit risus consequat sed.
            Duis accumsan lorem vel odio auctor, convallis bibendum orci
            rhoncus.
          </p>
        </div>

        <v-divider class="my-6"></v-divider>
        <div id="topic-1" class="topic-section">
          <h2>Variables</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            tincidunt, nisi a hendrerit pharetra, diam mauris semper lorem, quis
            porttitor dolor sapien sed nisi. Sed quis erat nulla. Mauris eu arcu
            nisl.
          </p>
        </div>
        <div id="topic-2" class="topic-section">
          <h2>Lists</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            tincidunt, nisi a hendrerit pharetra, diam mauris semper lorem, quis
            porttitor dolor sapien sed nisi. Sed quis erat nulla. Mauris eu arcu
            nisl.
          </p>
        </div>
        <div id="topic-3" class="topic-section">
          <h2>Operators</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            tincidunt, nisi a hendrerit pharetra, diam mauris semper lorem, quis
            porttitor dolor sapien sed nisi. Sed quis erat nulla. Mauris eu arcu
            nisl.
          </p>
        </div>
        <div id="topic-4" class="topic-section">
          <h2>Functions</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            tincidunt, nisi a hendrerit pharetra, diam mauris semper lorem, quis
            porttitor dolor sapien sed nisi. Sed quis erat nulla. Mauris eu arcu
            nisl.
          </p>
        </div>
        <div id="topic-5" class="topic-section">
          <h2>Loops</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            tincidunt, nisi a hendrerit pharetra, diam mauris semper lorem, quis
            porttitor dolor sapien sed nisi. Sed quis erat nulla. Mauris eu arcu
            nisl.
          </p>
        </div>
        <div id="topic-6" class="topic-section">
          <h2>Conditionals</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            tincidunt, nisi a hendrerit pharetra, diam mauris semper lorem, quis
            porttitor dolor sapien sed nisi. Sed quis erat nulla. Mauris eu arcu
            nisl.
          </p>
        </div>

        <v-divider class="my-6"></v-divider>

        <div id="topic-7" class="topic-section">
          <h2>Drive Train</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            tincidunt, nisi a hendrerit pharetra, diam mauris semper lorem, quis
            porttitor dolor sapien sed nisi. Sed quis erat nulla. Mauris eu arcu
            nisl.
          </p>
        </div>
        <div id="topic-8" class="topic-section">
          <h2>Websockets</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            tincidunt, nisi a hendrerit pharetra, diam mauris semper lorem, quis
            porttitor dolor sapien sed nisi. Sed quis erat nulla. Mauris eu arcu
            nisl.
          </p>
        </div>
        <div id="topic-9" class="topic-section">
          <h2>Sensors</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            tincidunt, nisi a hendrerit pharetra, diam mauris semper lorem, quis
            porttitor dolor sapien sed nisi. Sed quis erat nulla. Mauris eu arcu
            nisl.
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.logo-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.sidebar {
  background-color: #f4f4f4;
  height: 100vh;
  overflow-y: auto;
  padding-top: 20px;
}

.v-navigation-drawer {
  width: 250px; /* fixed sidebar width */
}

.main-content {
  padding: 20px;
}

.topic-section {
  margin-bottom: 40px;
}

.topic-section h2 {
  font-weight: bold;
  margin-bottom: 10px;
}

.topic-section p {
  line-height: 1.6;
}

.v-application--wrap {
  padding: 0; /* removes extra spacing between sidebar and content */
}
</style>
