<template>
  <v-container fluid>
    <v-row justify="center" class="logo-container">
      <img
        src="https://images.squarespace-cdn.com/content/v1/62100392b06da21d57a55522/f5d86703-4cb1-4319-97f4-f130d9fea4e3/The+STEM+Embassy.png?format=1500w"
        alt="Logo"
        class="logo"
      />
    </v-row>

    <!--#region main - -->
    <!--#endregion -->

    <!--#region main - WEBSOCKET CONNECTION -->
    <v-card class="pa-3 mx-auto" width="650" flat>
      <v-card-title class="text-h6 py-1">IP Connection</v-card-title>
      <v-card-text class="py-1">
        <v-row align="center" no-gutters dense>
          <v-col>
            <v-text-field
              v-model="ipAddress"
              label="IP Address"
              placeholder="192.168.1.1"
              variant="underlined"
              density="compact"
              hide-details="auto"
              :disabled="isConnecting || isConnected"
            ></v-text-field>
          </v-col>
          <v-col class="d-flex align-center ml-4" cols="auto">
            <v-btn
              :loading="isConnecting"
              :color="isConnected ? 'error' : 'primary'"
              @click="toggleConnection"
              class="mr-2"
              density="compact"
              variant="tonal"
            >
              {{ isConnected ? "Disconnect" : "Connect" }}
            </v-btn>

            <v-tooltip :text="connectionStatus" location="bottom">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="ml-2">
                  <v-icon
                    :color="getStatusColor"
                    icon="mdi-circle"
                    size="small"
                  ></v-icon>
                </div>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!--#endregion -->

    <!--#region main - COMPONENTS-->

    <v-row class="bottom-row">
      <v-col cols="12" md="4" class="bottom-component">
        <div class="component-title">Robot distance</div>
        <div class="component-placeholder"><CurrentDistance/></div>
      </v-col>
      <v-col cols="12" md="4" class="bottom-component">
        <div class="component-title">Controls</div>
        <div class="component-placeholder">
          <KeyPressedComponent @data-sent="receivecontrollerData" />
        </div>
      </v-col>
      <v-col cols="12" md="4" class="bottom-component">
        <div class="component-title">Currently viewed color</div>
        <div class="component-placeholder"><CurrentlyViewedColor class="color-sensor" /></div>
      </v-col>
    </v-row>

    <!--#endregion -->

    <!--#region main - Message history box -->
    <div v-if="isConnected || messages.length > 0" class="mt-3">
      <div class="text-subtitle-2 font-weight-medium">Recent Messages</div>
      <v-card variant="outlined" class="mt-1 bg-grey-lighten-4">
        <div class="pa-2" style="max-height: 150px; overflow-y: auto">
          <div v-if="messages.length === 0" class="text-grey text-center py-2">
            No messages received yet
          </div>
          <template v-else>
            <div
              v-for="(message, index) in messagesReversedLimited"
              :key="index"
              class="message-item py-1 px-2 rounded my-1"
              :class="{ 'bg-grey-lighten-3': index % 2 === 0 }"
            >
              <div class="d-flex align-center">
                <span class="text-caption text-grey">{{
                  message.timestamp
                }}</span>
                <v-spacer></v-spacer>
              </div>
              <pre class="message-content text-body-2 mt-1">{{
                message.content
              }}</pre>
            </div>
          </template>
        </div>
      </v-card>
    </div>
    <!--#endregion -->
  </v-container>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from "vue";

// Handle WASD Data
const receivecontrollerData = (data) => {
  console.log("Data received from child:", data.value);
  // const jsonObject = JSON.parse(data.value);
  websocket.send(JSON.stringify(data.value));
};

const ipAddress = ref("ws://localhost:8080/ws");
const isConnected = ref(false);
const isConnecting = ref(false);
const connectionError = ref("");
const messages = ref([]);
let websocket = null;

// Computed properties
const messagesReversedLimited = computed(() => {
  // Return the last 5 messages in reverse order (newest first)
  return [...messages.value].reverse().slice(0, 5);
});

const getStatusColor = computed(() => {
  if (isConnected.value) return "success";
  if (isConnecting.value) return "warning";
  if (connectionError.value) return "error";
  return "grey";
});

const connectionStatus = computed(() => {
  if (isConnected.value) return "Connected";
  if (isConnecting.value) return "Connecting...";
  if (connectionError.value) return connectionError.value;
  return "Disconnected";
});

// Methods
function connect() {
  try {
    connectionError.value = "";
    isConnecting.value = true;

    websocket = new WebSocket(ipAddress.value);

    websocket.onopen = () => {
      isConnected.value = true;
      isConnecting.value = false;
      websocket.send("Hello from dashboard");
      addMessage("Dashboard Connected");
    };

    websocket.onclose = (closeEvent) => {
      isConnected.value = false;

      // Parse close event for better error information
      let message = "CONNECTION TERMINATED";
      if (closeEvent.code !== 1000) {
        message += ` (CODE: ${closeEvent.code}`;
        if (closeEvent.reason) {
          message += ` - ${closeEvent.reason})`;
        } else {
          message += ")";
        }
      }
      addMessage(message);
    };

    websocket.onerror = (event) => {
      // Log the error event object to console for debugging
      console.error("WebSocket error event:", event);

      // WebSocket error events don't contain direct error messages
      addMessage(`CONNECTION ERROR: Communication failure detected`);
    };

    websocket.onmessage = (event) => {
      console.log("Message received:", event.data);
      try {
        const data = JSON.parse(event.data);
        if (
          data.blue !== undefined &&
          data.clear !== undefined &&
          data.red !== undefined &&
          data.green !== undefined
        ) {
          // Only add color sensor messages to the display
          addMessage(event.data);
          // Update background color based on RGB values
          document.querySelector(
            ".color-sensor"
          ).style.backgroundColor = `rgb(${data.red}, ${data.green}, ${data.blue})`;
        }

        if(data.distance !== undefined) {
          // Only add distance messages to the display
          addMessage(event.data);
          // Update background color based on RGB values
          document.querySelector(
            ".distance-display"
          ).innerHTML = `<p>Distance: ${ data.distance } cm</p>`;
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };
    // Connection state will be handled by WebSocket events
  } catch (error) {
    connectionError.value = `Error: ${error.message}`;
    isConnecting.value = false;
    addMessage("Disconnected");
  }
}

function disconnectFromDevice() {
  isConnecting.value = true;

  websocket.close();
  addMessage("Connetion closed");
  isConnecting.value = false;
}

function toggleConnection() {
  if (isConnected.value) {
    disconnectFromDevice();
  } else {
    connect();
  }
}

function addMessage(content) {
  const now = new Date();
  const timestamp = now.toLocaleTimeString();

  // Try to format as JSON if it's valid JSON
  let formattedContent = content;
  try {
    // Check if content is a JSON string
    const jsonObj = JSON.parse(content);
    formattedContent = JSON.stringify(jsonObj, null, 2);
  } catch (e) {
    // Not JSON, use as-is
    console.log(e.data);
    formattedContent = content;
  }

  messages.value.push({
    timestamp,
    content: formattedContent,
  });

  // Limit to last 20 messages (we only display 5, but keep more in memory)
  if (messages.value.length > 20) {
    messages.value.shift();
  }
}

onBeforeUnmount(() => {
  if (isConnected.value) {
    disconnectFromDevice();
  }
});
</script>

<style>
/* Large component styling */
.large-component {
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

/* Bottom components styling */
.bottom-row {
  display: flex;
  width: 100%;
  gap: 20px;
}

.bottom-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40vh;
  flex: 1;
  padding: 10px;
}

.component-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Placeholder styling for visual clarity */
.component-placeholder {
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
