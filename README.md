# Music Library Frontend

A Neo-Brutalism themed React frontend for the Music Library Rails API.

## Setup

1. Make sure your Rails backend is running on `http://localhost:3000`

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Features

- User authentication (signup/login with JWT)
- View all songs
- Add new songs
- Edit existing songs
- Delete songs
- Neo-Brutalism design theme

## API Configuration

The app expects the Rails API to be running at `http://localhost:3000`. If your API is running on a different port, update the `API_URL` in `src/services/api.js`.

## Design Theme

This app uses a Neo-Brutalism design with:
- Flat, saturated colors (#FF005C, #00F0FF, #000000, #FFFFFF)
- Thick black borders (3-4px)
- Hard shadows
- IBM Plex Mono font
- Asymmetrical layouts
- Raw, intentionally rough aesthetic
