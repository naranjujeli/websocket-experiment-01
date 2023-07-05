import React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import '../styles/App.css';

const REACT_PORT = 3000;

const socket = io.connect(`http://${process.env.REACT_APP_HOST}:${REACT_PORT+1}`);

export default function App() {
  const [ mouses, setMouses ] = useState({});

  useEffect(() => {
    // Update mouses positions from the server
    socket.on('some-mouse-moved', (data) => {
      setMouses(data.mouses);
    });
  }, []);

  // Render each circle
  let circles = [];
  const mouseIds = Object.keys(mouses);
  for (let i = 0; i < mouseIds.length; i++) {
    // Iterate for each unique ID and render a new circle with its corresponding data
    const currentMouse = mouses[mouseIds[i]]
    circles.push(
      <CircleMouse 
      key={mouseIds[i]} 
      bgcolor={currentMouse.bgcolor} 
      currpos={currentMouse.currpos} 
      oldpos={currentMouse.oldpos} 
      />
    );
  }

  // Send update to the server each time the user moves their mouse
  function handleMouseMove(event) {
    socket.emit('my-mouse-moved', { 
      position: { 
        x: event.clientX, 
        y: event.clientY 
      } 
    });
  }

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      { circles }
    </div>
  );
}

function CircleMouse({ bgcolor, currpos, oldpos }) {
  const currPosPythagoras = Math.sqrt(Math.pow(oldpos.x, 2)+Math.pow(oldpos.y, 2));
  const oldPosPythagoras = Math.sqrt(Math.pow(currpos.x, 2)+Math.pow(currpos.y, 2));
  const posDifference = Math.abs(currPosPythagoras-oldPosPythagoras);
  const diameter = Math.pow(posDifference, 1.2)+100;

  const offset = diameter/2;

  return (
      <div 
      style={{ 
        position: "absolute", 
        top: currpos.y-offset, 
        left: currpos.x-offset ,
        aspectRatio: "1/1",
        width: `${diameter}px`,
        borderRadius: "50%",
        backgroundColor: bgcolor
      }}>

      </div>
  );
}
