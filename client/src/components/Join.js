import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (
        <div className="joinOuterContainer">
            <h1 className="heading">Join</h1>
            <div>
                <input 
                placeholder="Name" 
                className="joinInput" 
                type="text" 
                onChange={setName}/>
            </div>
            <div>
                <input 
                placeholder="Room"
                className="joinInput"
                type="text"
                onChange={setRoom}/>
            </div>
            <Link>
                <button className="button" type="submit">Sign In</button>
            </Link>
        </div>
    )
}

export default Join;