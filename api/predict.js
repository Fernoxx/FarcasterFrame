// /api/predict.js

// Vercel serverless function for generating mystical predictions
export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // GET → sample prediction
  if (req.method !== 'POST') {
    const sample = generateSamplePrediction()
    return sendPredictionResponse(res, '@sample_user', sample, req)
  }

  // POST → real user prediction
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

function generatePrediction(birthdate) {
  const date = new Date(birthdate)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const techZodiac = getTechZodiacSign(day, month)
  const mystical = generateMysticalPrediction(techZodiac, day, month)
  return {
    sign: techZodiac.name,
    symbol: techZodiac.symbol,
    prediction: mystical,
    element: techZodiac.element
  }
}

function getTechZodiacSign(day, month) {
  const techZodiacs = [
    { name: "Protocol Aries",         symbol: "🤖", element: "Neural",    dates: [[3,21],[4,19]] },
    { name: "Blockchain Taurus",      symbol: "🪙", element: "Quantum",   dates: [[4,20],[5,20]] },
    { name: "Protocol Gemini",        symbol: "🧠", element: "Binary",    dates: [[5,21],[6,20]] },
    { name: "Crypto Cancer",          symbol: "✨", element: "Ethereal",  dates: [[6,21],[7,22]] },
    { name: "Neural Leo",             symbol: "💰", element: "Photonic",  dates: [[7,23],[8,22]] },
    { name: "Algorithm Virgo",        symbol: "🔮", element: "Digital",   dates: [[8,23],[9,22]] },
    { name: "Token Libra",            symbol: "⚡", element: "Cosmic",    dates: [[9,23],[10,22]] },
    { name: "Quantum Scorpio",        symbol: "🌟", element: "Plasma",    dates: [[10,23],[11,21]] },
    { name: "Metaverse Sagittarius",  symbol: "🚀", element: "Stellar",   dates: [[11,22],[12,21]] },
    { name: "Cipher Capricorn",       symbol: "💎", element: "Crystalline",dates: [[12,22],[1,19]] },
    { name: "AI Aquarius",            symbol: "🌊", element: "Liquid",    dates: [[1,20],[2,18]] },
    { name: "Smart Pisces",           symbol: "🐠", element: "Fluid",     dates: [[2,19],[3,20]] }
  ]

  for (let z of techZodiacs) {
    for (let [m1,d1] of z.dates) {
      let [startM,startD,endM,endD] = 
        m1 < d1 
          ? [m1,d1,z.dates.find(r=>r!==z.dates[0])[0],z.dates.find(r=>r!==z.dates[0])[1]]
          : [m1,d1,m1,d1]
      if ((month===startM && day>=startD) || (month===endM && day<=endD)) {
        return z
      }
    }
  }
  return techZodiacs[0]
}

function generateMysticalPrediction(zodiac, day, month) {
  const all = {
    "Protocol Aries": [
      "The Neural Tide aligns with your frequency. A self-executing protocol will recognize your digital signature by the 3rd quantum cycle. Watch for signals in the mesh networks.",
      "Binary storms approach your sector. The 7th node will amplify your transaction power exponentially. Prepare for a metamorphosis in the liquid markets.",
      "Your biometric hash resonates with emerging algorithms. By the next solar array calibration, a decentralized oracle may choose your voice as its primary input."
    ],
    "Blockchain Taurus": [
      "Crystalline structures form around your wallet address. The mining pools whisper of a convergence where your holdings multiply through quantum entanglement.",
      "Ancient cryptographic keys unlock in your presence. The 4th dimensional exchange will present opportunities that reshape your digital territory.",
      "Your private key vibrates at the frequency of abundance. Smart contracts written in your essence will execute automatically when Mars aligns with the mining rigs."
    ],
    // … add the rest exactly as before …
  }
  const list = all[zodiac.name] || all["Protocol Aries"]
  const idx = (day + month) % list.length
  return list[idx]
}

function generateSamplePrediction() {
  return {
    sign: "Protocol Gemini",
    symbol: "🧠",
    prediction: "The Neural Tide aligns with Protocol Gemini. By 2032, a self-learning token may choose your voice as its oracle. Watch the 8th lunar cycle.",
    element: "Binary"
  }
}

function sendPredictionResponse(res, username, { sign, symbol, prediction, element }, req) {
  const protocol = req.headers['x-forwarded-proto'] || 'https'
  const host     = req.headers.host || 'localhost:3000'
  const imageText = encodeURIComponent(`${sign} ${symbol}`)
  const imageUrl  = `https://dummyimage.com/600x314/293958/cedce7.png&text=${imageText}`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your Digital Prophecy - ${username}</title>
  <!-- Farcaster Frame metas & OG -->
  <meta name="fc:frame" content="vNext">
  <meta name="fc:frame:image" content="${imageUrl}">
  <meta property="og:title" content="Digital Oracle - ${sign}">
  <meta property="og:description" content="${prediction.substring(0,100)}...">
  <meta property="og:image" content="${imageUrl}">
  <!-- Fonts & Styles (unchanged) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Figtree:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #cedce7;
    color: #293958;
    font-family: 'Figtree', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .prophecy-container {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 50px;
    box-shadow: 0 15px 40px rgba(41, 57, 88, 0.15);
    max-width: 700px;
    width: 100%;
    backdrop-filter: blur(10px);
    text-align: center;
  }

  .username {
    font-size: 1.1rem;
    opacity: 0.7;
    margin-bottom: 20px;
  }

  .sign-title {
    font-family: 'Crimson Pro', serif;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #293958, #4a6fa5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .symbol {
    font-size: 4rem;
    margin: 20px 0;
    display: block;
  }

  .element {
    font-size: 1.2rem;
    color: #4a6fa5;
    margin-bottom: 30px;
    font-weight: 500;
  }

  .prediction {
    font-size: 1.3rem;
    line-height: 1.8;
    margin: 30px 0;
    padding: 30px;
    background: linear-gradient(135deg, rgba(74, 111, 165, 0.1), rgba(41, 57, 88, 0.1));
    border-radius: 15px;
    border-left: 4px solid #4a6fa5;
    text-align: left;
  }

  .mystical-footer {
    margin-top: 40px;
    opacity: 0.6;
    font-size: 0.9rem;
  }

  .back-button {
    display: inline-block;
    margin-top: 30px;
    padding: 15px 30px;
    background: linear-gradient(135deg, #293958, #4a6fa5);
    color: white;
    text-decoration: none;
    border-radius: 12px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .back-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(41, 57, 88, 0.3);
  }

  .frame-note {
    margin-top: 30px;
    padding: 20px;
    background: rgba(74, 111, 165, 0.1);
    border-radius: 10px;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  @media (max-width: 480px) {
    .prophecy-container {
      padding: 30px 20px;
    }
    .sign-title {
      font-size: 2.2rem;
    }
    .symbol {
      font-size: 3rem;
    }
    .prediction {
      font-size: 1.1rem;
      padding: 20px;
    }
  }
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

    <!-- ★ Share on Farcaster ★ -->
    <button id="shareBtn" class="back-button">Share</button>

  <script type="module">
    // pull in the Mini-App SDK at runtime
    import { sdk } from 'https://esm.sh/@farcaster/miniapp-sdk'

    document.getElementById('shareBtn').addEventListener('click', async () => {
      try {
        await sdk.actions.composeCast({
          text: `I got ${sign}: "${prediction}". Get yours Cryptic Horroscope: ${window.location.href}`,
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
