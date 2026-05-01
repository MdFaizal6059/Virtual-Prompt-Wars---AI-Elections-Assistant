const express = require('express');
const path = require('path');
const fs = require('fs');
const { generateResponse } = require('./logic');

// Load environment variables locally if .env exists (fallback for systems without dotenv package)
try {
    if (fs.existsSync(path.join(__dirname, '.env'))) {
        const envConfig = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
        envConfig.split('\n').forEach(line => {
            const match = line.match(/^([^=:#]+?)[=:](.*)/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim();
                process.env[key] = value;
            }
        });
    }
} catch (e) {
    console.error("Error loading .env file:", e);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Explicitly define a route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/chat', async (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    
    // Check if Gemini API is configured
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (apiKey) {
        try {
            // Load System Prompt
            let systemPrompt = "You are VoterAssistAI, a helpful AI Election Assistant for India.";
            try {
                systemPrompt = fs.readFileSync(path.join(__dirname, 'system_prompt.txt'), 'utf8');
            } catch (e) {
                console.warn("Could not load system_prompt.txt, using default prompt.");
            }

            // Call Gemini API via native REST fetch (zero external dependencies)
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;
            
            const requestBody = {
                contents: [{
                    parts: [{ text: query }]
                }],
                systemInstruction: {
                    parts: [{ text: systemPrompt }]
                },
                generationConfig: {
                    temperature: 0.2, // Keep it factual and neutral
                }
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                const aiText = data.candidates[0].content.parts[0].text;
                return res.json({ response: aiText });
            } else {
                console.error("Gemini API Error:", await response.text());
                throw new Error("Gemini API request failed.");
            }

        } catch (error) {
            console.error("Failed to generate response with Gemini API. Falling back to local logic.", error);
            // Fallback gracefully
        }
    }

    // Fallback logic if API key missing or API fails
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
