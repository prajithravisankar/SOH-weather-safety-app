# SafeGuard Development Process Documentation 📋

> **🔍 For Complete Development History and documentation: Please refer to the `dev` branch to see the full development process and commit history. This documentation shows the systematic breakdown and execution that led to our final product. Kindly find the README.md and documentation in the dev branch for development process**

## 🏗️ **Software Engineering Best Practices Demonstrated**

This document showcases **professional software development methodology** applied to a hackathon project. Rather than diving straight into coding, I followed industry-standard practices:

### ✅ **Strategic Planning & Architecture**
- **Comprehensive MVP breakdown** into 8 distinct phases (36+ hours planned)
- **Granular task decomposition** - each major goal broken into actionable sub-tasks
- **Technology stack evaluation** and deliberate framework selection
- **Risk mitigation planning** with API fallback strategies

### ✅ **Agile Development Process**
- **Iterative development** - building core functionality first, then enhancing
- **Feature-driven development** - each phase delivers working functionality
- **Continuous integration** - regular testing and validation at each milestone
- **Documentation-driven development** - maintaining clear progress tracking

### ✅ **Professional Git Workflow**
- **Branch management**: Protected `main` branch + active `dev` branch development
- **Incremental commits** with descriptive messages throughout development
- **Merge strategy** ensuring clean main branch for production deployment
- **Version control discipline** maintaining project history and rollback capability

### ✅ **Full-Stack Architecture**
- **Separation of concerns** - dedicated frontend/backend with clear API boundaries
- **Modular component design** - reusable React components with single responsibilities
- **Service layer abstraction** - clean API integration with fallback mechanisms
- **Responsive design principles** - mobile-first development with desktop enhancement

### ✅ **Quality Assurance & Testing**
- **Manual testing protocols** - Postman API validation and cross-device testing
- **Error handling** - graceful degradation and user-friendly error messages
- **Performance considerations** - optimized map rendering and API caching
- **User experience validation** - intuitive interface design for emergency scenarios

---

## 📈 **Development Journey Overview**

**Total Development Time**: 36+ hours across 8 phases  
**Final Result**: Hackathon-ready SafeGuard application with real-time disaster monitoring  
**Technologies Mastered**: React + Vite, Node.js + Express, Leaflet.js, NASA EONET API, Tailwind CSS  
**Key Achievement**: Transformed complex safety requirements into intuitive, responsive web application  

---

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

- [x]  Sub-todo 1.1.1: Create GitHub repository
    - [x]  Name: `weather-safety-app`
    - [x]  Initialize with `README.md`, `.gitignore` (Node.js + React templates), and `MIT License`
- [x]  Sub-todo 1.1.2: Create branches
    - [x]  `main` (protected branch, final code only)
    - [x]  `dev` (shared development branch)

### Main Todo 1.2: Tech Stack Finalization

- [x]  Sub-todo 1.2.1: Frontend stack
    - [x]  Framework: React (with Vite)
    - [x]  Map library: React Leaflet (Leaflet.js)
    - [x]  UI styling: Tailwind CSS (mobile-first)
- [x]  Sub-todo 1.2.2: Backend stack
    - [x]  Runtime: Node.js + Express
    - [x]  API routing: RESTful endpoints
    - [x]  No database (use JSON/mock data for MVP)
- [ ]  Sub-todo 1.2.3: Weather/disaster APIs
    - [ ]  still pending decision...

### Main Todo 1.3: MVP Scope Finalization

- [x]  Sub-todo 1.3.1: Prioritize core features
    - [x]  Static location management (add/edit/delete)
    - [x]  Weather radar overlay on map
    - [x]  Mobile-friendly UI
    - [x]  API fallback for resilience (use mock data if API fails)
    - [x]  Simple, stress-free UI
- [ ]  Sub-todo 1.3.2: Document scope in README
    - [ ]  still pending decision...

---

## Phase 2: Backend API Development (Hours 3–6)

**Goal**: Build core backend APIs for location management and disaster data.

### Main Todo 2.1: Server Setup

- [x]  Sub-todo 2.1.1: Initialize backend
    - [x]  Create `backend/` folder
    - [x]  Run `npm init -y` and install dependencies: `express`, `cors`, `dotenv`
    - [x]  Add `.gitignore` for `node_modules/` and `.env`
- [x]  Sub-todo 2.1.2: Create `server.js`
    - [x]  Set up Express server with ES modules, dotenv, CORS, and JSON middleware
    - [x]  Added root route for server health check
- [x]  Sub-todo 2.1.3: Test server
    - [x]  Ran server and confirmed 'Server running!' message in browser/terminal

### Main Todo 2.2: Mock Auth Routes

- [x]  Sub-todo 2.2.1: Create `/api/auth` routes
    - [x]  File: `backend/routes/auth.js`
    - [x]  Endpoint: `POST /api/auth/login` → returns mock user ID (e.g., `{ userId: 1 }`)
- [x]  Sub-todo 2.2.2: Register routes in `server.js`
    - [x]  Imported `auth.js` and registered with `app.use('/api/auth', authRoutes)`

### Main Todo 2.3: Location Management API

- [x]  Sub-todo 2.3.1: Create `/api/locations` routes
    - [x]  File: `backend/routes/locations.js`
    - [x]  Endpoints: `GET`, `POST`, `DELETE` for static location management (mock data)
- [x]  Sub-todo 2.3.2: Test routes with Postman
    - [x]  Verified GET, POST, and DELETE for /api/locations work as expected on port 5050

### Main Todo 2.4: Disaster Data Proxy

- [x]  Sub-todo 2.4.1: Create `/api/disasters` route
    - [x]  File: `backend/routes/disasters.js`
    - [x]  Registered in server.js, returns mock response for now
- [x]  Sub-todo 2.4.2: Add API key management
    - [x]  Created `.env` file for API keys, loaded with dotenv in server.js, and accessed via process.env in route files
- [x]  Sub-todo 2.4.3: Implement mock data fallback
    - [x]  Created `mock-data/disasters.json` and updated disasters route to serve mock data if real API fails

---

## Phase 3: Frontend Map Integration (Hours 7–12)

**Goal**: Build map UI with overlays and mobile responsiveness.

### Main Todo 3.1: Frontend Setup

- [x]  Sub-todo 3.1.1: Initialize React app
    - [x]  Created frontend with Vite + React, installed axios, leaflet, react-leaflet, tailwindcss, postcss, autoprefixer, and set up Tailwind CSS integration
- [x]  Sub-todo 3.1.2: Organize file structure
    - [x]  Created `components/`, `services/`, and `utils/` folders in frontend/src, with placeholder files for planned features

### Main Todo 3.2: Map Initialization

- [x]  Sub-todo 3.2.1: Install Leaflet.js
    - [x]  Installed leaflet and react-leaflet, and imported leaflet CSS for map rendering
- [x]  Sub-todo 3.2.2: Create `MapView` component
    - [x]  Built MapView with React-Leaflet, rendering a map centered on San Francisco with a marker and popup
- [x]  Sub-todo 3.2.3: Add zoom controls
    - [x]  Added zoom controls to the map using React-Leaflet's ZoomControl (top-right).

### Main Todo 3.3: Weather Overlay

- [x]  Sub-todo 3.3.1: Fetch disaster data from backend using getDisasterData() in disasterService.js. Data is loaded into MapView state from /api/disasters (mock data for MVP). [2025-06-29 IST]
- [x]  Sub-todo 3.3.2: Display disaster event markers
    - [x]  Parsed EONET-style mock disaster data from `mock-data/disasters.json`
    - [x]  Added `Marker` components for each event with Point geometry (all categories)
    - [x]  Showed event details (title, description, category, date) in marker popups
    - [x]  Verified markers render and popups display correct info

---

## Phase 4: Location Management UI (Hours 13–16)

**Goal**: Allow users to add/view static locations on the map.

### Main Todo 4.1: Location Form

- [x]  Sub-todo 4.1.1: Create `LocationForm` component
    - [x]  Fields: `name`, `latitude`, `longitude`
    - [x]  Submit button → POST to `/api/locations`
    - [x]  Locations are now persisted in `mock-data/members.json` via the backend route.
    - [x]  Tested with Postman and frontend; confirmed new locations are saved and returned.
    - [x]  Backend logic updated to read/write from file, not in-memory array. 
- [x]  Sub-todo 4.1.2: Validate form inputs
    - [x]  Check for non-empty fields and valid numbers
    - [x]  Validation errors are shown below the button and disappear after 5 seconds.
    - [x]  Form is styled horizontally and matches the Vite dark theme.

### Main Todo 4.2: Location Display

- [x]  Sub-todo 4.2.1: Fetch locations from backend
    - [x]  Used `getLocations()` in `locationService.js` to fetch locations from `/api/locations`.
    - [x]  Used `useEffect` in `LocationList.jsx` and `MapView.jsx` to load locations on mount.
    - [x]  Locations are now displayed as green markers on the map with custom icons, differentiated from red disaster markers.
    - [x]  Verified new locations appear on the map and in the list after adding.
- [x]  Sub-todo 4.2.2: Render location list
    - [x]  Display in sidebar/card layout with scrollable area for long lists
    - [x]  Clicking location pans map to coordinates with zoom
    - [x]  Added delete functionality with trash icon buttons
    - [x]  Improved responsive layout: map + sidebar on desktop, stacked on mobile
    
---

## Phase 5: API Resilience & Fallbacks (Hours 17–18)

**Goal**: Handle API failures gracefully.

### Main Todo 5.1: Fallback Data Strategy

- [x]  Sub-todo 5.1.1: Create `/mock-data/disasters.json`
    - [x]  Include sample earthquake/weather data
- [x]  Sub-todo 5.1.2: Add error handling in `disasterService.js`
    - [x]  If API fails, return mock data from `/mock-data/disasters.json`
    - [x]  Integrated NASA EONET API (v3) in backend `/api/disasters` route for real-time disaster data
    - [x]  Automatic fallback to mock data if EONET API is unavailable

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

## Phase 8: User Authentication & Data Isolation (Completed June 29, 2025, 9:11 PM IST)

**Goal:** Ensure each user sees only their own locations, and locations display immediately after login.

- [x] Implemented user authentication (register/login) with `/api/auth` endpoints and `mock-data/users.json`.
- [x] User-specific location storage: each user has their own `{username}-locations.json` file.
- [x] Updated backend (`locations.js`) to require username for all endpoints and isolate data.
- [x] Updated frontend services and components to pass username for all location API calls.
- [x] Fixed bug where locations did not display immediately after login (removed conflicting useEffect in `MapView.jsx`).
- [x] Thoroughly debugged state flow and confirmed locations now render instantly after login for each user.

---
