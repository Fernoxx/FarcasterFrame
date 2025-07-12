// /api/predict.js

// Vercel serverless function for generating mystical predictions
export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // If someone GETs /api/predict, show a sample
  if (req.method !== 'POST') {
    const samplePrediction = generateSamplePrediction()
    return sendPredictionResponse(res, '@sample_user', samplePrediction, req)
  }

  // POST: real request
  try {
    const { username, birthdate } = req.body
    if (!username || !birthdate) {
      return res.status(400).json({ error: 'Username and birthdate are required' })
    }
    const prediction = generatePrediction(birthdate)
    return sendPredictionResponse(res, username, prediction, req)
  } catch (err) {
    console.error('Prediction error:', err)
    return res.status(500).json({ error: 'Failed to generate prediction' })
  }
}

// … your existing generatePrediction / getTechZodiacSign / generateMysticalPrediction / generateSamplePrediction here …

function sendPredictionResponse(res, username, { sign, symbol, prediction, element }, req) {
  const protocol = req.headers['x-forwarded-proto'] || 'https'
  const host     = req.headers.host || 'localhost:3000'
  const imageUrl = `https://dummyimage.com/600x314/293958/cedce7.png&text=${encodeURIComponent(sign + ' ' + symbol)}`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your Digital Prophecy - ${username}</title>
  <!-- Farcaster / Open Graph meta -->
  <meta name="fc:frame" content="vNext">
  <meta name="fc:frame:image" content="${imageUrl}">
  <meta property="og:title" content="Digital Oracle - ${sign}">
  <meta property="og:description" content="${prediction.substring(0,100)}...">
  <meta property="og:image" content="${imageUrl}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Figtree:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    /* your existing styles here… */
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
      <p>The algorithms have spoken...</p>
      <p>🤖 ✨ 🧠 💰 ✨ 🪙</p>
    </div>
    <a href="/" class="back-button">Consult Again</a>

    <!-- SHARE BUTTON -->
    <button id="shareBtn">Share on Farcaster</button>
    <script type="module">
      // load the sdk from a CDN at runtime
      import { sdk } from 'https://esm.sh/@farcaster/miniapp-sdk'
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
