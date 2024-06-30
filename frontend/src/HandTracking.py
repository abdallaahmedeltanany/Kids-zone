from flask import Flask, render_template, Response, request, jsonify
import cv2
import numpy as np
import mediapipe as mp
import random

app = Flask(_name_)

# Initialize the hand tracker
class HandTracker:
    def _init_(self, mode=False, maxHands=2, detectionCon=0.5, trackCon=0.5):
        self.mode = mode
        self.maxHands = maxHands
        self.detectionCon = detectionCon
        self.trackCon = trackCon
        self.mpHands = mp.solutions.hands
        self.hands = self.mpHands.Hands(self.mode, self.maxHands, self.detectionCon, self.trackCon)
        self.mpDraw = mp.solutions.drawing_utils

    def findHands(self, img, draw=True):
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        self.results = self.hands.process(imgRGB)

        if self.results.multi_hand_landmarks:
            for handLm in self.results.multi_hand_landmarks:
                if draw:
                    self.mpDraw.draw_landmarks(img, handLm, self.mpHands.HAND_CONNECTIONS)
        return img

    def getPosition(self, img, handNo=0, draw=True):
        lmList = []
        if self.results.multi_hand_landmarks:
            myHand = self.results.multi_hand_landmarks[handNo]
            for lm in myHand.landmark:
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                lmList.append((cx, cy))

                if draw:
                    cv2.circle(img, (cx, cy), 5, (255, 0, 255), cv2.FILLED)
        return lmList

    def getUpFingers(self, img):
        pos = self.getPosition(img, draw=False)
        self.upfingers = []
        if pos:
            # Thumb
            self.upfingers.append((pos[4][1] < pos[3][1] and (pos[5][0] - pos[4][0] > 10)))
            # Index
            self.upfingers.append((pos[8][1] < pos[7][1] and pos[7][1] < pos[6][1]))
            # Middle
            self.upfingers.append((pos[12][1] < pos[11][1] and pos[11][1] < pos[10][1]))
            # Ring
            self.upfingers.append((pos[16][1] < pos[15][1] and pos[15][1] < pos[14][1]))
            # Pinky
            self.upfingers.append((pos[20][1] < pos[19][1] and pos[19][1] < pos[18][1]))
        return self.upfingers

class ColorRect:
    def _init_(self, x, y, w, h, color, text='', alpha=0.5):
        self.x = x
        self.y = y
        self.w = w
        self.h = h
        self.color = color
        self.text = text
        self.alpha = alpha
    
    def drawRect(self, img, text_color=(255,255,255), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=0.8, thickness=2):
        # Draw the box
        alpha = self.alpha
        bg_rec = img[self.y : self.y + self.h, self.x : self.x + self.w]
        white_rect = np.ones(bg_rec.shape, dtype=np.uint8)
        white_rect[:] = self.color
        res = cv2.addWeighted(bg_rec, alpha, white_rect, 1-alpha, 1.0)
        
        # Putting the image back to its position
        img[self.y : self.y + self.h, self.x : self.x + self.w] = res

        # Put the text
        text_size = cv2.getTextSize(self.text, fontFace, fontScale, thickness)
        text_pos = (int(self.x + self.w/2 - text_size[0][0]/2), int(self.y + self.h/2 + text_size[0][1]/2))
        cv2.putText(img, self.text, text_pos , fontFace, fontScale, text_color, thickness)

    def isOver(self, x, y):
        return (self.x + self.w > x > self.x) and (self.y + self.h > y > self.y)

# Initialize the hand tracker
detector = HandTracker(detectionCon=1)

@app.route('/')
def index():
    return render_template('index.html')

def gen_frames():
    cap = cv2.VideoCapture(0)
    cap.set(3, 1280)
    cap.set(4, 720)
    canvas = np.zeros((720, 1280, 3), np.uint8)
    px, py = 0, 0
    color = (255, 0, 0)
    brushSize = 5
    eraserSize = 20
    colorsBtn = ColorRect(200, 0, 100, 100, (120, 255, 0), 'Colors')
    colors = [
        ColorRect(300, 0, 100, 100, (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))),
        ColorRect(400, 0, 100, 100, (0, 0, 255)),
        ColorRect(500, 0, 100, 100, (255, 0, 0)),
        ColorRect(600, 0, 100, 100, (0, 255, 0)),
        ColorRect(700, 0, 100, 100, (0, 255, 255)),
        ColorRect(800, 0, 100, 100, (0, 0, 0), "Eraser"),
    ]
    clear = ColorRect(900, 0, 100, 100, (100, 100, 100), "Clear")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        detector.findHands(frame)
        positions = detector.getPosition(frame, draw=False)
        upFingers = detector.getUpFingers(frame)

        if upFingers:
            x, y = positions[8][0], positions[8][1]
            if upFingers[1] and not upFingers[2]:
                # Handle color selection
                for c in colors:
                    if c.isOver(x, y):
                        color = c.color
                        break

                # Handle eraser
                if colors[-1].isOver(x, y):
                    color = (0, 0, 0)

                # Handle clear canvas
                if clear.isOver(x, y):
                    canvas = np.zeros((720, 1280, 3), np.uint8)

                # Draw on canvas
                if px == 0 and py == 0:
                    px, py = positions[8]
                if color == (0, 0, 0):
                    cv2.line(canvas, (px, py), positions[8], color, eraserSize)
                else:
                    cv2.line(canvas, (px, py), positions[8], color, brushSize)
                px, py = positions[8]

        # Draw UI elements on the frame
        colorsBtn.drawRect(frame)
        clear.drawRect(frame)
        for c in colors:
            c.drawRect(frame)

        # Combine canvas with frame
        frame = cv2.add(frame, canvas)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# Endpoint to change drawing color
@app.route('/change_color', methods=['GET'])
def change_color():
    color = request.args.get('color')  # Get color parameter from request
    # Perform any additional validation or processing as needed
    # For demonstration, simply return success response
    return jsonify({'message': f'Color changed to {color}'}), 200

# Endpoint to clear canvas
@app.route('/clear_canvas', methods=['GET'])
def clear_canvas():
    # Perform canvas clearing logic
    # For demonstration, simply return success response
    return jsonify({'message': 'Canvas cleared'}), 200

if _name_ == '__main__':
    app.run(host="127.0.0.1", port=5000, debug=True)