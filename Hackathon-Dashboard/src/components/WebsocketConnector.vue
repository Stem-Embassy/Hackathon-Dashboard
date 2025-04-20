<template>
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

      <!-- Message history box -->
      <div v-if="isConnected || messages.length > 0" class="mt-3">
        <div class="text-subtitle-2 font-weight-medium">
          Recent Messages (Last 5)
        </div>
        <v-card variant="outlined" class="mt-1 bg-grey-lighten-4">
          <div class="pa-2" style="max-height: 150px; overflow-y: auto">
            <div
              v-if="messages.length === 0"
              class="text-grey text-center py-2"
            >
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
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';

// State
const ipAddress = ref('');
const isConnected = ref(false);
const isConnecting = ref(false);
const connectionError = ref('');
const messages = ref([]);
const websocket = ref(null);

// Computed properties
const getStatusColor = computed(() => {
  if (isConnected.value) return 'success';
  if (isConnecting.value) return 'warning';
  if (connectionError.value) return 'error';
  return 'grey';
});

const connectionStatus = computed(() => {
  if (isConnected.value) return 'Connected';
  if (isConnecting.value) return 'Connecting...';
  if (connectionError.value) return connectionError.value;
  return 'Disconnected';
});

const displayMessages = computed(() => {
  return [...messages.value].reverse().slice(0, 5);
});

// Methods
const connectToDevice = async () => {
  // Reset error state
  connectionError.value = '';
  isConnecting.value = true;
  
  try {
    // Initialize real WebSocket connection
    initWebSocket();
    
    // Set short timeout to simulate connection establishment
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Connection state will be handled by WebSocket events
  } catch (error) {
    connectionError.value = `Error: ${error.message}`;
    isConnecting.value = false;
  }
};

const disconnectFromDevice = async () => {
  isConnecting.value = true;
  
  try {
    // Close WebSocket if it exists
    if (websocket.value) {
      websocket.value.close();
      websocket.value = null;
    }
  } catch (error) {
    connectionError.value = `Error disconnecting: ${error.message}`;
  } finally {
    isConnecting.value = false;
  }
};

const toggleConnection = () => {
  if (isConnected.value) {
    disconnectFromDevice();
  } else {
    connectToDevice();
  }
};

const initWebSocket = () => {
  try {
    // Create actual WebSocket connection
    websocket.value = new WebSocket(`ws://${ipAddress.value}`);
    
    // Connection opened
    websocket.value.addEventListener('open', (event) => {
      isConnected.value = true;
      isConnecting.value = false;
      addMessage('Connection established');
    });
    
    // Listen for messages
    websocket.value.addEventListener('message', (event) => {
      addMessage(event.data);
    });
    
    // Connection closed
    websocket.value.addEventListener('close', (event) => {
      isConnected.value = false;
      if (event.wasClean) {
        addMessage(
          `Connection closed cleanly, code=${event.code}, reason=${event.reason}`
        );
      } else {
        // Connection died
        addMessage('Connection died');
        connectionError.value = 'Connection lost';
      }
    });
    
    // Error handling
    websocket.value.addEventListener('error', (error) => {
      connectionError.value = 'WebSocket error';
      addMessage(`WebSocket error: ${error}`);
      isConnecting.value = false;
    });
  } catch (error) {
    connectionError.value = `Failed to connect: ${error.message}`;
    isConnecting.value = false;
  }
};

const addMessage = (content) => {
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
};
</script>