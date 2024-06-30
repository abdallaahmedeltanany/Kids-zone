// Utilities.js

// Smoothing variables
let smoothX = null;
let smoothY = null;
const smoothingFactor = 0.3; // Adjust this factor based on your smoothing preference

let startDrawingTimeout = null;
const startDrawingDelay = 300; // Delay in milliseconds (0.3 seconds)

export const drawHand = (landmarks, ctx, canvasWidth, canvasHeight) => {
    const indexFingerTip = landmarks[8]; // Index finger tip
    const indexFingerBase = landmarks[5]; // Index finger base
  
    if (indexFingerTip && indexFingerBase) {
        const x = indexFingerTip.x * canvasWidth;
        const y = indexFingerTip.y * canvasHeight;
  
        // Implement smoothing using a weighted average
        if (smoothX === null || smoothY === null) {
            smoothX = x;
            smoothY = y;
        } else {
            smoothX = smoothX * (1 - smoothingFactor) + x * smoothingFactor;
            smoothY = smoothY * (1 - smoothingFactor) + y * smoothingFactor;
        }
  
        // Calculate the distance between the index finger tip and the base
        const dx = indexFingerTip.x - indexFingerBase.x;
        const dy = indexFingerTip.y - indexFingerBase.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        // Set a threshold for considering the hand as closed
        const threshold = 0.1; // Adjust this value based on your requirements
  
        if (distance > threshold) {
            // Start drawing after the delay
            if (!startDrawingTimeout && !ctx.isDrawing) {
                startDrawingTimeout = setTimeout(() => {
                    ctx.isDrawing = true;
                    ctx.beginPath();
                    ctx.moveTo(smoothX, smoothY);
                    startDrawingTimeout = null; // Reset the timeout handler
                }, startDrawingDelay);
            }
  
            if (ctx.isDrawing) {
                ctx.lineTo(smoothX, smoothY);
                ctx.stroke();
            }
        } else {
            ctx.isDrawing = false;
            // Reset smoothing and timeout if hand is not drawing
            smoothX = null;
            smoothY = null;
            clearTimeout(startDrawingTimeout);
            startDrawingTimeout = null;
        }
    } else {
        ctx.isDrawing = false;
        // Reset smoothing and timeout if landmarks are not detected
        smoothX = null;
        smoothY = null;
        clearTimeout(startDrawingTimeout);
        startDrawingTimeout = null;
    }
};
