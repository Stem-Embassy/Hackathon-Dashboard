import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
console.log('WebSocket server running on ws://localhost:8080');

const USERS = [
  { email: 'user@stemembassy.com', password: 'password123' },
];

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    try {
      const { type, payload } = JSON.parse(message);

      if (type === 'LOGIN') {
        const user = USERS.find(
          (u) => u.email === payload.email && u.password === payload.password
        );

        if (user) {
          ws.send(JSON.stringify({
            type: 'LOGIN_SUCCESS',
            payload: { email: user.email }
          }));
        } else {
          ws.send(JSON.stringify({
            type: 'LOGIN_FAILURE',
            payload: { message: 'Invalid email or password.' }
          }));
        }
      }
    } catch (err) {
      ws.send(JSON.stringify({
        type: 'ERROR',
        payload: { message: 'Invalid message format.', error: err.message }
      }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
