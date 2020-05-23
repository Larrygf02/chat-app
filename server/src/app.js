import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import router from './router';

const PORT = process.env.PORT || 5000
const app = express();
const server = http.createServer(app);
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('We have a new connection...')
    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
        const error = true;
        if (error) {
            callback({ error: 'error'})
        }
        callback(error)
    })
    socket.on('disconnect', () => {
        console.log('User has disconnected!!')
    })
})

app.use(router)

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

