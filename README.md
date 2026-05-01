# VoterAssistAI 🗳️ - AI Elections Assistant

## Description
VoterAssistAI is a lightweight, production-ready, cloud-compatible AI-powered web application designed to help Indian voters (especially in Tamil Nadu) understand the election process, voting steps, timelines, and guidelines.

It features a minimal Node.js/Express backend to process queries, a clean Tailwind CSS frontend, and comprehensive accessibility features, all while keeping the entire repository under 1MB without heavy dependencies.

## Features
- **Interactive AI Chat Assistant**: Ask questions and get simple, step-by-step, beginner-friendly answers via a dedicated `/chat` API.
- **Backend Architecture**: Secure and testable Node.js + Express backend with modular logic.
- **Testing**: Includes core functionality validation using Vitest (voting process, timelines, neutrality).
- **Google Maps Integration**: Lightweight iframe embed to visualize polling station examples without bloated SDKs.
- **Tamil Nadu Voter Guide**: Specific guidance for TN voters to check voter lists, find polling booths, and know the required documents.
- **Modern UI/UX**: Premium SaaS feel using Tailwind CSS (via CDN), clean layout, typing indicators, and smooth animations.
- **Accessible (a11y)**: Built with ARIA labels, semantic HTML, keyboard navigation, and alt text for all users.
- **Cloud-Ready**: Includes a lightweight `Dockerfile` and `cloudbuild.yaml` for instant cloud deployment.
- **Politically Neutral**: Educational information only, strictly adhering to ECI guidelines.

## Architecture
1. **Backend (`server.js`, `logic.js`)**: Minimal Express server exposing a `POST /chat` endpoint. Core AI and pattern matching logic is encapsulated in `logic.js` for easy testing and maintenance.
2. **Frontend (`index.html`, `app.js`)**: Modern SPA interface that securely communicates with the backend API. Styled purely with Tailwind CDN.
3. **Agentic System Prompt (`system_prompt.txt`)**: Defines the core behavior, tone, constraints, and operational guidelines for the assistant.

## Quick Start (Local Development)
1. Ensure Node.js is installed.
2. Install minimal dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Access the application at `http://localhost:3000`.

## Testing
Run the Vitest test suite to validate core AI logic and neutrality:
```bash
npm test
```

## Cloud Deployment (Docker)
Build and run the lightweight container:
```bash
docker build -t voter-assist-ai .
docker run -p 3000:3000 voter-assist-ai
```
For Google Cloud, use the included `cloudbuild.yaml`.
