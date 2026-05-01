const express = require('express');
const path = require('path');
const { generateResponse } = require('./logic');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/chat', (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    
    // Simulate slight network delay for realistic bot feel (handled on frontend or backend)
    const responseHtml = generateResponse(query);
    res.json({ response: responseHtml });
});

app.listen(PORT, () => {
    console.log(`VoterAssistAI server running on port ${PORT}`);
});
