import React, { useState, useEffect } from 'react'
import queryString from 'query-string';
import io from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input'
import './Chat.css'
import Messages from '../Messages/Messages';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [ messages, setMessages] = useState([]);
    const [ message, setMessage ] = useState('');
    const ENDPOINT = 'https://chat022.herokuapp.com/'
    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        socket = io(ENDPOINT)
        setName(name)
        setRoom(room)
        console.log(socket);
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error)
            }
        });
        return () => {
            socket.emit('disconnet')
            socket.off();
        }
        
    }, [ENDPOINT, location.search] )

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message])
        })
    }, [])

    // function for sending messages
    const sendMessage = e => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    console.log(message, messages);
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}></InfoBar>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;