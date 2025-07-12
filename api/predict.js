// /api/predict.js

import { sdk } from '@farcaster/miniapp-sdk'

// Vercel serverless function for generating mystical predictions
export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    if (req.method !== 'POST') {
        // Handle direct GET requests to /api/predict
        const samplePrediction = generateSamplePrediction()
        return sendPredictionResponse(res, '@sample_user', samplePrediction, req)
    }

    try {
        const { username, birthdate } = req.body
        
        if (!username || !birthdate) {
            return res.status(400).json({ error: 'Username and birthdate are required' })
        }

        // Generate prediction based on birthdate
        const prediction = generatePrediction(birthdate)
        
        return sendPredictionResponse(res, username, prediction, req)
        
    } catch (error) {
        console.error('Prediction error:', error)
        return res.status(500).json({ error: 'Failed to generate prediction' })
    }
}

function generatePrediction(birthdate) {
    // Parse the date
    const date = new Date(birthdate)
    const day = date.getDate()
    const month = date.getMonth() + 1 // JavaScript months are 0-indexed
    
    // Calculate tech-zodiac sign based on Indian astrology mapping
    const techZodiac = getTechZodiacSign(day, month)
    
    // Generate mystical prediction
    const prediction = generateMysticalPrediction(techZodiac, day, month)
    
    return {
        sign: techZodiac.name,
        symbol: techZodiac.symbol,
        prediction: prediction,
        element: techZodiac.element
    }
}

function getTechZodiacSign(day, month) {
    // ... your existing zodiac logic ...
}

function generateMysticalPrediction(techZodiac, day, month) {
    // ... your existing predictions logic ...
}

function generateSamplePrediction() {
    return {
        sign: "Protocol Gemini",
        symbol: "🧠",
        prediction: "The Neural Tide aligns with Protocol Gemini. By 2032, a self-learning token may choose your voice as its oracle. Watch the 8th lunar cycle.",
        element: "Binary"
    }
}

function sendPredictionResponse(res, username, predictionData, req) {
    const { sign, symbol, prediction, element } = predictionData
    
    // Get the current domain for frame meta tags
    const protocol = req.headers['x-forwarded-proto'] || 'https'
    const host = req.headers.host || 'localhost:3000'
    const currentDomain = `${protocol}://${host}`
    
    // Create image URL with prediction text
    const imageText = encodeURIComponent(`${sign} ${symbol}`)
    const imageUrl = `https://dummyimage.com/600x314/293958/cedce7.png&text=${imageText}`
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Digital Prophecy - ${username}</title>
    
    <!-- Farcaster Frame Meta Tags -->
    <meta name="fc:frame" content="vNext" />
    <meta name="fc:frame:image" content="${imageUrl}" />
    <meta name="fc:frame:button:1" content="Reveal Again" />
    <meta name="fc:frame:post_url" content="${currentDomain}/api/predict" />
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="Digital Oracle - Your Mystical Prediction" />
    <meta property="og:description" content="${prediction.substring(0, 100)}..." />
    <meta property="og:image" content="${imageUrl}" />
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Figtree:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <style>
        /* your existing styles… */
    </style>
</head>
<body>
    <div class="prophecy-container">
        <div class="username">Digital Entity: ${username}</div>
        
        <h1 class="sign-title">${sign}</h1>
        <span class="symbol">${symbol}</span>
        <div class="element">Element: ${element}</div>
        
        <div class="prediction">${prediction}</div>
        
        <div class="mystical-footer">
            <p>The algorithms have spoken. Your digital fate is sealed in the blockchain of destiny.</p>
            <p>🤖 ✨ 🧠 💰 ✨ 🪙</p>
        </div>
        
        <a href="/" class="back-button">Consult the Oracle Again</a>
        
        <div class="frame-note">
            <strong>Created by @doteth</strong><br>
            Yo, as I said I am not a fortune teller, but I can predict from how algorithms behave.
        </div>

        <!-- ★ NEW SHARE ON FARCASTER BUTTON ★ -->
        <button id="shareBtn">Share on Farcaster</button>
        <script type="module">
          import { sdk } from '@farcaster/miniapp-sdk'
          document.getElementById('shareBtn').addEventListener('click', async () => {
            try {
              await sdk.actions.composeCast({
                text: \`My Digital Prophecy is ${sign}: "${prediction}"\`,
                embeds: [window.location.href]
              })
            } catch (e) {
              console.error('Share failed', e)
            }
          })
        </script>
    </div>
</body>
</html>`

    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(html)
}
