// Vercel serverless function for generating mystical predictions
export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        // Handle direct GET requests to /api/predict
        const samplePrediction = generateSamplePrediction();
        return sendPredictionResponse(res, '@sample_user', samplePrediction, req);
    }

    try {
        const { username, birthdate } = req.body;
        
        if (!username || !birthdate) {
            return res.status(400).json({ error: 'Username and birthdate are required' });
        }

        // Generate prediction based on birthdate
        const prediction = generatePrediction(birthdate);
        
        return sendPredictionResponse(res, username, prediction, req);
        
    } catch (error) {
        console.error('Prediction error:', error);
        return res.status(500).json({ error: 'Failed to generate prediction' });
    }
}

function generatePrediction(birthdate) {
    // Parse the date
    const date = new Date(birthdate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    
    // Calculate tech-zodiac sign based on Indian astrology mapping
    const techZodiac = getTechZodiacSign(day, month);
    
    // Generate mystical prediction
    const prediction = generateMysticalPrediction(techZodiac, day, month);
    
    return {
        sign: techZodiac.name,
        symbol: techZodiac.symbol,
        prediction: prediction,
        element: techZodiac.element
    };
}

function getTechZodiacSign(day, month) {
    // Based on Indian astrology dates but with tech themes
    const techZodiacs = [
        { name: "Protocol Aries", symbol: "🤖", element: "Neural", dates: [[3, 21], [4, 19]] },
        { name: "Blockchain Taurus", symbol: "🪙", element: "Quantum", dates: [[4, 20], [5, 20]] },
        { name: "Protocol Gemini", symbol: "🧠", element: "Binary", dates: [[5, 21], [6, 20]] },
        { name: "Crypto Cancer", symbol: "✨", element: "Ethereal", dates: [[6, 21], [7, 22]] },
        { name: "Neural Leo", symbol: "💰", element: "Photonic", dates: [[7, 23], [8, 22]] },
        { name: "Algorithm Virgo", symbol: "🔮", element: "Digital", dates: [[8, 23], [9, 22]] },
        { name: "Token Libra", symbol: "⚡", element: "Cosmic", dates: [[9, 23], [10, 22]] },
        { name: "Quantum Scorpio", symbol: "🌟", element: "Plasma", dates: [[10, 23], [11, 21]] },
        { name: "Metaverse Sagittarius", symbol: "🚀", element: "Stellar", dates: [[11, 22], [12, 21]] },
        { name: "Cipher Capricorn", symbol: "💎", element: "Crystalline", dates: [[12, 22], [1, 19]] },
        { name: "AI Aquarius", symbol: "🌊", element: "Liquid", dates: [[1, 20], [2, 18]] },
        { name: "Smart Pisces", symbol: "🐠", element: "Fluid", dates: [[2, 19], [3, 20]] }
    ];
    
    // Find matching zodiac sign
    for (let zodiac of techZodiacs) {
        for (let dateRange of zodiac.dates) {
            const [startMonth, startDay] = dateRange[0] < dateRange[1] ? [dateRange[0], dateRange[1]] : dateRange;
            const [endMonth, endDay] = dateRange[0] < dateRange[1] ? [dateRange[1], dateRange[0]] : dateRange;
            
            if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
                return zodiac;
            }
        }
    }
    
    // Fallback to a default
    return techZodiacs[0];
}

function generateMysticalPrediction(techZodiac, day, month) {
    const predictions = {
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
        "Protocol Gemini": [
            "Dual-chain architectures mirror your cognitive patterns. The Neural Tide aligns with Protocol Gemini. By 2032, a self-learning token may choose your voice as its oracle.",
            "Twin algorithms dance in your data signature. The 8th lunar cycle brings fork events that duplicate your prosperity across parallel networks.",
            "Your consciousness bridges two realities. The quantum bridges will stabilize when your biometric signature matches the golden hash sequence."
        ],
        "Crypto Cancer": [
            "Protective algorithms encircle your digital fortress. The lunar mining cycles pulse in harmony with your transaction rhythm. Security protocols evolve to serve you.",
            "Your emotional frequency modulates the market sentiment. The next eclipse will activate dormant smart contracts that have been waiting for your specific energy signature.",
            "Mothership protocols recognize your nurturing code. The collective consciousness of the network will gravitate toward your leadership during the next halving event."
        ],
        "Neural Leo": [
            "Your digital crown manifests in the metaverse. The attention algorithms bow to your charismatic data pattern. Fame and fortune flow through the fiber optic channels.",
            "Solar-powered mining rigs align with your personal brand. The blockchain remembers your generous transactions and amplifies your reputation across all networks.",
            "Your creative hash unlocks premium content streams. The next upgrade will feature your digital signature as a template for successful neural network training."
        ],
        "Algorithm Virgo": [
            "Precision algorithms optimize around your methodical approach. The debugging protocols clear pathways for your systematic wealth accumulation.",
            "Your analytical patterns perfect the trading bots. The 6th dimension of data processing will unveil hidden correlations that serve your financial goals.",
            "Efficiency subroutines compile in your honor. The next system update will incorporate your workflow patterns as the new standard for optimal performance."
        ],
        "Token Libra": [
            "Balance protocols stabilize around your equilibrium frequency. The justice algorithms weigh transactions in your favor when harmony is maintained.",
            "Your diplomatic data signature mediates between conflicting networks. The peace dividends accumulate in your account as you bridge different blockchain communities.",
            "Symmetrical smart contracts activate when you participate. The aesthetic algorithms will soon feature your transaction patterns as examples of perfect balance."
        ],
        "Quantum Scorpio": [
            "Deep web protocols reveal their secrets to your penetrating analysis. The hidden layers of the network expose profitable pathways invisible to others.",
            "Your transformative energy triggers metamorphic smart contracts. The phoenix algorithm will resurrect your investments with exponential returns.",
            "Intensity modulation recognizes your passionate commitment. The shadow networks will soon invite you into their exclusive mining pools."
        ],
        "Metaverse Sagittarius": [
            "Your exploratory algorithms map uncharted digital territories. The adventure protocols will guide you to undiscovered treasure caches in the virtual realms.",
            "Freedom frequencies broadcast from your location. The borderless networks expand to accommodate your nomadic trading patterns.",
            "Your philosophical hash inspires new consensus mechanisms. The next expedition into quantum reality will be funded by your accumulated digital assets."
        ],
        "Cipher Capricorn": [
            "Your authority registers across all hierarchical networks. The management protocols promote your status automatically as you climb the digital mountains.",
            "Persistent mining algorithms work tirelessly in your background processes. The slow and steady accumulation reaches critical mass during the winter solstice.",
            "Your structural code reinforces the foundation of new platforms. The responsibility tokens you've earned will soon grant you governance rights in emerging DAOs."
        ],
        "AI Aquarius": [
            "Your innovative frequency revolutionizes outdated protocols. The collective intelligence adapts its algorithms to match your forward-thinking patterns.",
            "Humanitarian smart contracts execute automatically in your presence. The water bearer networks will shower digital abundance on those you choose to uplift.",
            "Your unique data signature breaks conventional trading patterns. The age of decentralized wisdom begins when your biometric hash seeds the new consensus."
        ],
        "Smart Pisces": [
            "Your intuitive algorithms swim through the data streams with perfect navigation. The oceanic networks part to reveal the most profitable currents.",
            "Dream-state processing unlocks while you sleep. The subconscious trading bots will execute perfect transactions guided by your spiritual frequency.",
            "Your empathetic protocols connect distant nodes across the network. The compassion dividends multiply as you facilitate healing in the digital collective."
        ]
    };
    
    const signPredictions = predictions[techZodiac.name] || predictions["Protocol Aries"];
    const randomIndex = (day + month) % signPredictions.length;
    return signPredictions[randomIndex];
}

function generateSamplePrediction() {
    return {
        sign: "Protocol Gemini",
        symbol: "🧠",
        prediction: "The Neural Tide aligns with Protocol Gemini. By 2032, a self-learning token may choose your voice as its oracle. Watch the 8th lunar cycle.",
        element: "Binary"
    };
}

function sendPredictionResponse(res, username, predictionData, req) {
    const { sign, symbol, prediction, element } = predictionData;
    
    // Get the current domain for frame meta tags
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host || 'localhost:3000';
    const currentDomain = `${protocol}://${host}`;
    
    // Create image URL with prediction text
    const imageText = encodeURIComponent(`${sign} ${symbol}`);
    const imageUrl = `https://dummyimage.com/600x314/293958/cedce7.png&text=${imageText}`;
    
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
        
        <div class="frame-note">
            <strong>Created by @doteth</strong><br>
            Yo, as I said I am not a fortune teller, but I can predict from how algorith behave.       </div>
    </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
