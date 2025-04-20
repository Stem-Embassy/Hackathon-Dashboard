<template>
  <v-container class="login-page" fluid>
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="rounded-xl pa-6 login-card" elevation="12">
          <v-card-title class="text-h5 text-center mb-4">
            Welcome Back
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="handleLogin" ref="formRef" lazy-validation>
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                variant="outlined"
                color="primary"
                class="mb-4"
                density="comfortable"
                rounded
                required
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                variant="outlined"
                color="primary"
                class="mb-4"
                density="comfortable"
                rounded
                required
              />

              <v-btn
                type="submit"
                variant="flat"
                size="large"
                block
                class="rounded-lg mt-2 MainColor"
              >
                Log In
              </v-btn>

              <v-alert
                v-if="error"
                type="error"
                class="mt-4"
                border="start"
                variant="tonal"
                density="compact"
              >
                {{ error }}
              </v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      socket: null,
    };
  },
  mounted() {
    this.connectWebSocket();
  },
  methods: {
    connectWebSocket() {
      this.socket = new WebSocket('ws://localhost:8080');
      this.socket.onopen = () => console.log('WebSocket connected');
      this.socket.onmessage = (event) => {
        const { type, payload } = JSON.parse(event.data);
        if (type === 'LOGIN_SUCCESS') {
          alert(`Welcome, ${payload.email}`);
          this.$router.push('/');
        } else if (type === 'LOGIN_FAILURE') {
          this.error = payload.message || 'Login failed.';
        } else if (type === 'ERROR') {
          this.error = payload.message || 'Server error.';
        }
      };
      this.socket.onerror = (err) => {
        console.error('WebSocket error:', err);
        this.error = 'Unable to connect.';
      };
      this.socket.onclose = () => {
        setTimeout(this.connectWebSocket, 2000);
      };
    },
    handleLogin() {
      this.error = '';
      if (this.email && this.password) {
        const msg = {
          type: 'LOGIN',
          payload: { email: this.email, password: this.password },
        };
        if (this.socket?.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify(msg));
        } else {
          this.error = 'Connection not ready. Please wait...';
        }
      } else {
        this.error = 'Please fill in both fields.';
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  background: linear-gradient(to bottom right, #e3f2fd, #f5f5f5);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
}
</style>
