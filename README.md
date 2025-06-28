# Weather Radar + Friend Safety App

**MVP Breakdown**

---

## Phase 1: Project Setup & Planning (Hours 1–2)

**Goal**: Finalize tech stack, initialize repo, and split tasks.

```markdown
# Project Structure
weather-safety-app/
├── **backend/**
│   ├── `server.js`            # Main server file
│   ├── `routes/`              # API routes
│   │   ├── `auth.js`          # User auth
│   │   ├── `locations.js`     # Static location management
│   │   └── `disasters.js`     # Weather/disaster API proxies
│   ├── `models/`              # Data models (e.g., User, Location)
│   └── `utils/`               # API resilience helpers (fallback logic)
├── **frontend/**
│   ├── `public/`              # Static assets (e.g., icons, maps)
│   ├── `src/`                 # React components
│   │   ├── `components/`      # MapView, LocationList, etc.
│   │   ├── `App.js`           # Main app layout
│   │   └── `index.js`         # Entry point
│   └── `styles/`              # Mobile-first CSS
├── **api-keys/**              # (Ignore in Git!) Store API keys here
├── **mock-data/**             # Mock locations/weather data for testing
├── **README.md**              # Project overview and setup instructions
└── **requirements.txt**       # API dependencies (e.g., Express, React)

```

### Main Todo 1.1: GitHub Setup

- [ ]  Sub-todo 1.1.1: Create GitHub repository
    - [ ]  Name: `weather-safety-app`
    - [ ]  Initialize with `README.md`, `.gitignore` (Node.js + React templates), and `MIT License`
- [ ]  Sub-todo 1.1.2: Create branches
    - [ ]  `main` (protected branch, final code only)
    - [ ]  `dev` (shared development branch)

### Main Todo 1.2: Tech Stack Finalization

- [ ]  Sub-todo 1.2.1: Frontend stack
    - [ ]  Framework: React (with `create-react-app`)
    - [ ]  Map library: Leaflet.js (free, lightweight) or Google Maps API (if easier for you)
    - [ ]  UI styling: CSS Flexbox/Grid (mobile-first)
- [ ]  Sub-todo 1.2.2: Backend stack
    - [ ]  Runtime: Node.js + Express
    - [ ]  API routing: RESTful endpoints
    - [ ]  No database (use mock data/localStorage for MVP)
- [ ]  Sub-todo 1.2.3: Weather/disaster APIs
    - [ ]  Primary: OpenWeatherMap (radar/wind data)
    - [ ]  Secondary: USGS (earthquake data)
    - [ ]  Tertiary: AirNow (air quality/unrest data)

### Main Todo 1.3: MVP Scope Finalization

- [ ]  Sub-todo 1.3.1: Prioritize core features
    - [ ]  Static location management (add/edit/delete)
    - [ ]  Weather radar overlay on map
    - [ ]  Mobile-friendly UI
- [ ]  Sub-todo 1.3.2: Document scope in README
    - [ ]  List APIs used, setup instructions, and MVP limitations

---

## Phase 2: Backend API Development (Hours 3–6)

**Goal**: Build core backend APIs for location management and disaster data.

### Main Todo 2.1: Server Setup

- [ ]  Sub-todo 2.1.1: Initialize backend
    - [ ]  Create `backend/` folder
    - [ ]  Run `npm init -y` and install dependencies: `express`, `cors`, `dotenv`
- [ ]  Sub-todo 2.1.2: Create `server.js`
    - [ ]  Set up Express server on port 5000
    - [ ]  Add middleware: `app.use(cors())`, `app.use(express.json())`
- [ ]  Sub-todo 2.1.3: Test server
    - [ ]  Run `node server.js` and verify "Server running on port 5000"

### Main Todo 2.2: Mock Auth Routes

- [ ]  Sub-todo 2.2.1: Create `/api/auth` routes
    - [ ]  File: `backend/routes/auth.js`
    - [ ]  Endpoint: `POST /api/auth/login` → returns mock user ID (e.g., `{ userId: 1 }`)
- [ ]  Sub-todo 2.2.2: Register routes in `server.js`
    - [ ]  Import `auth.js` and use `app.use('/api/auth', authRoutes)`

### Main Todo 2.3: Location Management API

- [ ]  Sub-todo 2.3.1: Create `/api/locations` routes
    - [ ]  File: `backend/routes/locations.js`
    - [ ]  Endpoints:
        - `GET /api/locations` → return mock data (e.g., `[{ name: "Home", lat: 37.7749, lon: -122.4194 }]`)
        - `POST /api/locations` → add new location to mock data
        - `DELETE /api/locations/:id` → remove location
- [ ]  Sub-todo 2.3.2: Test routes with Postman
    - [ ]  Verify `GET`, `POST`, and `DELETE` work

### Main Todo 2.4: Disaster Data Proxy

- [ ]  Sub-todo 2.4.1: Create `/api/disasters` route
    - [ ]  File: `backend/routes/disasters.js`
    - [ ]  Endpoint: `GET /api/disasters` → fetch data from OpenWeatherMap API (step 3.2.1)
- [ ]  Sub-todo 2.4.2: Add API key management
    - [ ]  Create `.env` file with `OPENWEATHERMAP_API_KEY`
    - [ ]  Use `dotenv` to load keys in `server.js`

---

## Phase 3: Frontend Map Integration (Hours 7–12)

**Goal**: Build map UI with overlays and mobile responsiveness.

### Main Todo 3.1: Frontend Setup

- [ ]  Sub-todo 3.1.1: Initialize React app
    - [ ]  Run `create-react-app frontend/`
    - [ ]  Install dependencies: `axios`, `leaflet`, `react-leaflet` (or `@react-google-maps/api` for Google Maps)
- [ ]  Sub-todo 3.1.2: Organize file structure
    - [ ]  Create folders: `components/`, `utils/`, `services/`

### Main Todo 3.2: Map Initialization

- [ ]  Sub-todo 3.2.1: Install Leaflet.js
    - [ ]  Run `npm install leaflet react-leaflet`
- [ ]  Sub-todo 3.2.2: Create `MapView` component
    - [ ]  Import `MapContainer`, `TileLayer`, and `Marker` from `react-leaflet`
    - [ ]  Render map with default center (e.g., San Francisco coordinates)
- [ ]  Sub-todo 3.2.3: Add zoom controls
    - [ ]  Use `ZoomControl` from `react-leaflet`

### Main Todo 3.3: Weather Overlay

- [ ]  Sub-todo 3.3.1: Fetch disaster data
    - [ ]  Create `services/disasterService.js` with `getDisasterData()` using `axios.get('/api/disasters')`
- [ ]  Sub-todo 3.3.2: Display earthquake markers
    - [ ]  Parse USGS earthquake data (example: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson`)
    - [ ]  Add `Marker` components for each earthquake

---

## Phase 4: Location Management UI (Hours 13–16)

**Goal**: Allow users to add/view static locations on the map.

### Main Todo 4.1: Location Form

- [ ]  Sub-todo 4.1.1: Create `LocationForm` component
    - [ ]  Fields: `name`, `latitude`, `longitude`
    - [ ]  Submit button → POST to `/api/locations`
- [ ]  Sub-todo 4.1.2: Validate form inputs
    - [ ]  Check for non-empty fields and valid numbers

### Main Todo 4.2: Location Display

- [ ]  Sub-todo 4.2.1: Fetch locations from backend
    - [ ]  Use `useEffect` to call `GET /api/locations` on load
- [ ]  Sub-todo 4.2.2: Render location list
    - [ ]  Display in sidebar/card layout
    - [ ]  Clicking location pans map to coordinates

---

## Phase 5: API Resilience & Fallbacks (Hours 17–18)

**Goal**: Handle API failures gracefully.

### Main Todo 5.1: Fallback Data Strategy

- [ ]  Sub-todo 5.1.1: Create `/mock-data/disasters.json`
    - [ ]  Include sample earthquake/weather data
- [ ]  Sub-todo 5.1.2: Add error handling in `disasterService.js`
    - [ ]  If API fails, return mock data from `/mock-data/disasters.json`

### Main Todo 5.2: Rate Limit Handling

- [ ]  Sub-todo 5.2.1: Throttle API requests
    - [ ]  Use `lodash.throttle` to limit calls to once every 5 seconds
- [ ]  Sub-todo 5.2.2: Add retry logic
    - [ ]  Retry failed requests 3 times before falling back

---

## Phase 6: Testing & Polish (Hours 19–24)

**Goal**: Ensure core features work on mobile and desktop.

### Main Todo 6.1: Cross-Device Testing

- [ ]  Sub-todo 6.1.1: Test on iPhone Safari
    - [ ]  Verify map zoom/pan works
- [ ]  Sub-todo 6.1.2: Test on Android Chrome
    - [ ]  Fix layout bugs (e.g., overlapping buttons)

### Main Todo 6.2: UX Polish

- [ ]  Sub-todo 6.2.1: Add loading spinners
    - [ ]  Show spinner while fetching data
- [ ]  Sub-todo 6.2.2: Improve accessibility
    - [ ]  Increase contrast for emergency scenarios

---

## Phase 7: Pitch Prep & Demo (Hours 25–36)

**Goal**: Record pitch video and document your work.

### Main Todo 7.1: Demo Script

- [ ]  Sub-todo 7.1.1: Write 2-minute demo walkthrough
    - [ ]  Show map with weather overlay
    - [ ]  Add a location → show it on map
    - [ ]  Simulate API failure → show fallback

### Main Todo 7.2: Pitch Deck

- [ ]  Sub-todo 7.2.1: Create slides
    - [ ]  Problem: Scattered apps during emergencies
    - [ ]  Solution: Unified map-based interface
    - [ ]  Uniqueness: Combines static locations + live weather
    - [ ]  Go-to-Market: Target families/first responders

### Main Todo 7.3: GitHub Cleanup

- [ ]  Sub-todo 7.3.1: Add screenshots to README
- [ ]  Sub-todo 7.3.2: Document setup instructions

---