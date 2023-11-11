"use client"
import { useEffect } from 'react';

const DrawingApp = () => {
  useEffect(() => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');

    let isDrawing = false;

    function startDrawing(e) {
      isDrawing = true;
      draw(e);
    }

    function endDrawing() {
      isDrawing = false;
      ctx.beginPath();
    }

    function draw(e) {
      if (!isDrawing) return;

      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';

      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mousemove', draw);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', endDrawing);
      canvas.removeEventListener('mousemove', draw);
    };
  }, []);

  const canvasStyles = {
    border: '1px solid #000',
    width: '80%',
    maxWidth: '800px',
    margin: '20px auto',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{fontSize:'2rem',color:'purple',fontFamily:'fantasy',}}>JavaScript Drawing App</h1>
      <hr/>
      <canvas id="drawingCanvas" width="800" height="600" style={canvasStyles} />
    </div>
  );
};

export default DrawingApp;

