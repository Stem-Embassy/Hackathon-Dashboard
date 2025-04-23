<script>
export default {
  data() {
    return {
      targetDate: "2025-03-18T20:00:00",
      timeLeft: null,
      timer: null,
      socket: null,
      currentColor: 'black',
      lastPayload: null,
      payloadHistory: [],
      error: null, // Added to handle error messages
    };
  },
  mounted() {
    this.startCountdown();
    this.connectWebSocket();
  },
  beforeUnmount() {
    clearInterval(this.timer);
    if (this.socket) {
      this.socket.close();
    }
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
            days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
            hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
            minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0"),
            seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
          };
        }
      }, 1000);
    },
    connectWebSocket() {
      this.socket = new WebSocket('ws://localhost:8080');

      this.socket.onopen = () => console.log('WebSocket connected');

      this.socket.onmessage = (event) => {
        console.log('Message received:', event.data);

        try {
          const data = JSON.parse(event.data);
          console.log('Complete WebSocket payload:', data);

          this.lastPayload = JSON.stringify(data, null, 2);
          this.payloadHistory.unshift({
            timestamp: new Date().toLocaleTimeString(),
            data: JSON.stringify(data, null, 2)
          });

          if (this.payloadHistory.length > 10) {
            this.payloadHistory.pop();
          }

          const { type, payload = {} } = data;

          switch (type) {
            case 'LOGIN_SUCCESS':
              alert(`Welcome, ${payload.email}`);
              this.$router.push('/');
              break;
            case 'LOGIN_FAILURE':
            case 'ERROR':
              this.error = payload.message || 'An error occurred.';
              break;
            default:
              if ('blue' in payload) this.currentColor = 'blue';
              else if ('red' in payload) this.currentColor = 'red';
              else if ('green' in payload) this.currentColor = 'green';
              else if ('clear' in payload) this.currentColor = 'black';
              break;
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      this.socket.onerror = (err) => {
        console.error('WebSocket error:', err);
        this.error = 'Unable to connect.';
      };

      this.socket.onclose = () => {
        console.warn('WebSocket closed. Reconnecting...');
        setTimeout(this.connectWebSocket, 2000);
      };
    },
  },
};
</script>
