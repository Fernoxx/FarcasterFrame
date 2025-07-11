# Digital Oracle - Farcaster Mini App

## Overview

This is a Farcaster mini app that generates mystical AI/crypto-themed predictions based on users' birthdates. The application consists of a simple web form where users enter their Farcaster username and date of birth, which then generates personalized futuristic predictions using a tech-zodiac system loosely based on Indian astrology.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a simple client-server architecture optimized for serverless deployment:

- **Frontend**: Pure HTML with embedded CSS and JavaScript served as a static file
- **Backend**: Node.js serverless function designed for Vercel deployment
- **Deployment**: Vercel-compatible serverless architecture with no persistent server requirements

## Key Components

### Frontend (`index.html`)
- Single-page application with embedded styles and scripts
- Responsive form interface with Google Fonts integration
- Color scheme: `#cedce7` background, `#293958` text
- Typography: "Crimson Pro" for headings, "Figtree" for body text
- Client-side form handling with POST requests to the API

### Backend (`/api/predict.js`)
- Vercel serverless function handler
- CORS-enabled for cross-origin requests
- Handles both GET (sample predictions) and POST (user predictions) requests
- Generates mystical predictions based on birthdate analysis
- Returns complete HTML responses with Farcaster Frame metadata

### Prediction Engine
- Tech-zodiac system mapping birthdates to 12 cryptic signs
- Personalized prediction generation using futuristic AI/crypto themes
- Avoids traditional astrology terminology, focusing on tech and blockchain concepts

### Farcaster Frame Integration
- Complete Frame metadata in HTML responses
- Dynamic image generation using placeholder services
- Interactive frame buttons for re-generation
- Self-referencing post URLs for frame interactions

## Data Flow

1. **User Input**: User enters Farcaster username and birthdate in the web form
2. **Form Submission**: Frontend sends POST request to `/api/predict` with user data
3. **Prediction Generation**: Backend processes birthdate to determine tech-zodiac sign
4. **Response Generation**: Server generates mystical prediction and returns complete HTML page
5. **Frame Display**: Response includes Farcaster Frame metadata for social sharing

## External Dependencies

### Frontend Dependencies
- Google Fonts: "Crimson Pro" and "Figtree" font families
- No JavaScript frameworks or libraries

### Backend Dependencies
- None - uses only Node.js built-in modules
- Compatible with Vercel's serverless runtime

### Third-party Services
- Placeholder image services (dummyimage.com) for Frame images
- Google Fonts CDN for typography

## Deployment Strategy

### Platform: Vercel
- Serverless function architecture
- Zero-config deployment from GitHub
- Automatic HTTPS and global CDN

### File Structure
```
/
├── index.html          # Static frontend
├── api/
│   └── predict.js      # Serverless function
├── package.json        # Project configuration
└── package-lock.json   # Dependency lock file
```

### Environment Considerations
- No database requirements
- No persistent state management
- Stateless serverless functions
- CORS headers configured for cross-origin access

### Key Architectural Decisions

**Pure HTML Frontend**: Chosen for simplicity and fast loading without build processes. Alternative frameworks like React were avoided to minimize complexity and bundle size.

**Serverless Backend**: Vercel functions selected for scalability and zero-maintenance deployment. Traditional Express servers were avoided to leverage serverless benefits.

**Embedded Styling**: CSS embedded directly in HTML to reduce HTTP requests and simplify deployment. External stylesheets were avoided for performance.

**Tech-Zodiac Algorithm**: Custom prediction system created to avoid copyright issues with traditional astrology while maintaining mystical appeal for the crypto/tech audience.

**Frame-First Design**: HTML responses optimized for Farcaster Frame display with proper metadata, ensuring social media compatibility.