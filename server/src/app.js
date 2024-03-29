import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import router from './router';
import { addUser, removeUser, getUser, getUsersInRoom } from './users';

const PORT = process.env.PORT || 5000
const app = express();
const server = http.createServer(app);
const io = socketio(server, { origins: '*:*' })

io.on('connection', (socket) => {
    console.log('We have a new connection...')
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) return callback(error);
        socket.join(user.room);
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined`})
        callback();
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log(user);
        io.to(user.room).emit('message', { user: user.name, text: message})
        callback();
    })

    socket.on('disconnect', () => {
        console.log('User has disconnected!!')
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has left`})
        }
    })
})

app.use(router)

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

