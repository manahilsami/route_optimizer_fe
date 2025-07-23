# Route Optimizer Frontend

This is a React-based web application for optimizing travel routes and discovering attractions between cities. This application allows users to search for places between two cities, select their favorite attractions, and generate an optimized route using Google Maps.

## Features

- **City-to-City Search**: Search for attractions and places between two cities
- **Interactive Place Cards**: Browse through discovered places with images, ratings, and location details
- **Favorite Selection**: Like/unlike places to build your custom attraction list
- **Route Optimization**: Generate optimized routes through your selected attractions
- **Google Maps Integration**: View your route and selected places on an interactive Google Map
- **Responsive Design**: Interface that works on different screen sizes

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** package manager
- **Google Maps API Key** (required for map functionality)

## Getting Started

### Google Maps API Setup

**Important**: This application requires a Google Maps API key to function properly.

#### Setting Up Environment Variables:

Open the `.env` file and add your Google Maps API key:

```bash
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**Note**: Replace `your_actual_api_key_here` with your actual Google Maps API key.

### Configure Backend URL

Make sure your backend API is running and update the URL in `src/components/utils/constants.js` if needed:

```javascript
export const url = "http://localhost:8000";
```

The application will be available at `http://localhost:3000`

### Maps & Geolocation

- **Google Maps JavaScript API** - Interactive maps, markers, and route visualization
- **Google Places API** - Place search and location data
- **Google Directions API** - Route calculation and optimization

### Environment & Configuration

- **Environment Variables** - Secure API key management using .env files

## Usage

1. **Search for Places**:

   - Enter your starting city and destination city
   - Click "Search" to discover attractions along the route

2. **Select Favorites**:

   - Browse through the discovered places in the sidebar
   - Click the heart button to like/unlike places
   - Selected places will be highlighted

3. **Generate Route**:
   - Click "Make Route" to optimize your route through selected attractions
   - View the optimized route on the Google Map

## Project Structure

```
src/
├── components/
│   ├── App/              # Main application component
│   ├── Header/           # Search header with city inputs
│   ├── Sidebar/          # Place cards and route controls
│   │   └── Itemcard/     # Individual place card component
│   ├── Map/              # Google Maps integration
│   └── utils/            # Constants and utilities
├── assets/               # Static assets (images, icons)
└── main.jsx             # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Backend Integration

This frontend connects to a backend API for:

- Searching places between cities
- Route optimization algorithms
- Place data management

Make sure your backend is running and accessible at the configured URL.

## Technologies Used

### Frontend Framework & Build Tools

- **React** (v18+) - JavaScript library for building user interfaces with component-based structure
- **JavaScript ES6+** - Modern JavaScript features including arrow functions, destructuring, and async/await

### Development & Code Quality

- **ESLint** - JavaScript linting for code quality and consistency
- **Vite Plugin React** - React integration with Vite build system

## Deployment Link

**View the live application**: [https://manahilsami.github.io/route_optimizer_fe/](https://manahilsami.github.io/route_optimizer_fe/)

## Troubleshooting

### Map Not Loading

- Verify your Google Maps API key is correctly set in the `.env` file
- Ensure the Maps JavaScript API is enabled in Google Cloud Console
- Check browser console for API-related errors

### Images Not Loading

- The application includes fallback handling for broken image URLs
- "No Image" placeholder will be shown for invalid images

### API Connection Issues

- Verify your backend is running
- Check the API URL in `constants.js`
