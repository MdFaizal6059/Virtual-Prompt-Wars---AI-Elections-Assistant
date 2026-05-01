const express = require('express');
const path = require('path');
const { generateResponse } = require('./logic');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Explicitly define a route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/chat', (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    
    // Simulate slight network delay for realistic bot feel (handled on frontend or backend)
    const responseHtml = generateResponse(query);
    res.json({ response: responseHtml });
});

// Conditionally start the server if not running in a serverless environment like Vercel
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`VoterAssistAI server running on port ${PORT}`);
    });
}

// Export the app for Vercel and other serverless deployment platforms
module.exports = app;
