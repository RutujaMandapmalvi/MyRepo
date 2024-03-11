const express = require('express');
const bodyParser = require('body-parser');
const { error } = require('console');

const app = express();
const PORT = 3000;

// In-memory storage (replace with a database in a real-world scenario)
const clips = [];
let subscriptionEnabled = false;

app.use(bodyParser.json());

// Admin Routes
app.post('/admin/record-clip', (req, res) => {
    const { clip } = req.body;
    clips.push(clip);
    res.status(201).json({ message: 'Clip recorded successfully.' });
});

app.post('/admin/broadcast', (req, res) => {
    const { message } = req.body;
    // Broadcast logic (e.g., send messages to subscribed customers)
    res.json({ message: 'Broadcast sent successfully.' });
});

app.post('/admin/transcript-audio', (req, res) => {
    const { audio } = req.body;
    // Audio transcription logic
    const transcript = `Transcription of audio: ${audio}`;
    res.json({ transcript });
});

// Customer Routes
app.post('/customer/subscribe', (req, res) => {
    subscriptionEnabled = true;
    res.json({ message: 'Subscription successful.' });
});

app.get('/customer/rewards', (req, res) => {
    // Rewards logic (e.g., display rewards points)
    const rewards = subscriptionEnabled ? 100 : 0;
    res.json({ rewards });
});

app.get('/customer/stream', (req, res) => {
    // Stream logic (e.g., provide access to audio clips)
    if (subscriptionEnabled) {
        res.json({ clips });
    } else {
        res.status(403).json({ message: 'Subscription required for streaming.' });
    }
});

app.listen(PORT, (error) => {
    if (error){
        console.log(error);
    }else{
    console.log(`Server is running on http://localhost:${PORT}`);
    }
});
