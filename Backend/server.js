const express = require('express');
const app = express();
const cors = require('cors');
const AgoraRTC = require('agora-rtc-sdk-ng');

// Configure Express and CORS
app.use(cors());
app.use(express.json());

// Your Agora App ID and Certificate (replace with your own)
const APP_ID = "YOUR_APP_ID";
const APP_CERTIFICATE = "YOUR_APP_CERTIFICATE";

// Function to generate Agora token
function generateToken(channelName, userId) {
  const expireTime = 3600; // Token expiration time in seconds (1 hour)
  const privilege = 1; // 1: publisher, 2: subscriber

  const token = AgoraRTC.RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName, // Use the room name prefixed with "meeting_" for channel names
    userId,
    expireTime,
    privilege
  );

  return token;
}

// Token generation endpoint
app.get('/token', (req, res) => {
  const roomName = req.query.roomName;
  const userId = roomName; // Or use your preferred identifier logic

  const channelName = `meeting_${roomName}`;
  const token = generateToken(channelName, userId);

  res.json({ token });
});

// Server listens on port 3000
app.listen(3000, () => console.log('Server listening on port 3000'));