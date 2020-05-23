import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import router from './router';
import { addUser, removeUser, getUser, getUsersInRoom } from './users';

const PORT = process.env.PORT || 5000
const app = express();
const server = http.createServer(app);
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('We have a new connection...')
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) return callback(error);
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`})
        socket.join(user.room);
        
    })

    socket.on('disconnect', () => {
        console.log('User has disconnected!!')
    })
})

app.use(router)

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

