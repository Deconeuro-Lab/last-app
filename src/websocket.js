import io from 'socket.io-client';
// const ws = io.connect('http://localhost:4000');
const ws = io.connect('https://last-app-server.herokuapp.com/');
export default ws;
