Date: June 28, 2025 Performed By: Prajith Ravisankar
- Created project folders and initialized git repository.
---
### Sub-todo 1.1.2: Create branches
- Created `main` and `dev` branches in git repository.

Date: June 28, 2025 Performed By: Prajith Ravisankar
---
### Main Todo 1.2: Tech Stack Finalization
- Frontend: React (Vite), React Leaflet, Tailwind CSS
- Backend: Node.js, Express, JSON/mock data for MVP
- Weather/disaster APIs: still pending decision...

Date: June 28, 2025, 6:45 PM IST Performed By: Prajith Ravisankar
---
### Main Todo 1.3: MVP Scope Finalization
- Core features: static location management, map overlays, mobile-friendly UI, API fallback, simple UX
- Documentation of scope in README: still pending decision...

Date: June 28, 2025, 6:50 PM IST Performed By: Prajith Ravisankar
---
### Sub-todo 2.1.1: Initialize backend
- Created `backend/` folder, initialized npm, installed express/cors/dotenv, and added .gitignore for node_modules and .env

Date: June 28, 2025, 8:35 PM IST Performed By: Prajith Ravisankar
---
### Sub-todo 2.1.2: Create server.js
- Set up Express server with ES modules, dotenv, CORS, and JSON middleware. Added root route for health check.

Date: June 28, 2025, 8:41 PM IST Performed By: Prajith Ravisankar
---
### Sub-todo 2.1.3: Test server
- Ran server and confirmed 'Server running!' message in browser/terminal.

Date: June 28, 2025, 8:45 PM IST Performed By: Prajith Ravisankar
---
### Sub-todo 2.2.1: Create /api/auth routes
- Created `backend/routes/auth.js` with POST /api/auth/login returning mock user ID for MVP authentication.

Date: June 28, 2025, 8:55 PM IST Performed By: Prajith Ravisankar
---
### Sub-todo 2.2.2: Register routes in server.js
- Imported `auth.js` and registered with `app.use('/api/auth', authRoutes)` in Express app.

Date: June 28, 2025, 8:58 PM IST Performed By: Prajith Ravisankar
---
### Sub-todo 2.3.1: Create /api/locations routes
- Created `backend/routes/locations.js` with GET, POST, DELETE endpoints for static location management using mock data.

Date: June 28, 2025, 9:15 PM IST Performed By: Prajith Ravisankar
---
### Sub-todo 2.3.2: Test routes with Postman
- Verified GET, POST, and DELETE for /api/locations work as expected on port 5050.

Date: June 28, 2025, 9:25 PM IST Performed By: Prajith Ravisankar
---
### Sub-todo 2.4.1: Create /api/disasters route
- Created `backend/routes/disasters.js` and registered in server.js. Returns mock response for now.

Date: June 29, 2025, 2:44 AM IST Performed By: Prajith Ravisankar
---
### Sub-todo 2.4.2: Add API key management
- Created `.env` for API keys, loaded with dotenv in server.js, and accessed via process.env in route files.

Date: June 29, 2025, 2:51 AM IST Performed By: Prajith Ravisankar
---
### Sub-todo 2.4.3: Implement mock data fallback
- Created `mock-data/disasters.json` and updated disasters route to serve mock data if real API fails.

Date: June 29, 2025, 3:00 AM IST Performed By: Prajith Ravisankar
---
### Sub-todo 3.1.1: Initialize React app
- Set up frontend with Vite, React, and Tailwind CSS. Verified Tailwind utility classes work in the app.

Date: June 29, 2025, 3:11 AM IST Performed By: Prajith Ravisankar
---
### Sub-todo 3.1.2: Organize file structure
- Set up folders for components, services, and utils in frontend. Added placeholder files for future features.

Date: June 29, 2025, 3:30 AM IST Performed By: Prajith Ravisankar
---
### Sub-todo 3.2.1: Install Leaflet.js
- Installed leaflet and react-leaflet, and imported leaflet CSS to ensure maps display correctly.

Date: June 29, 2025, 3:37 AM IST Performed By: Prajith Ravisankar
---
### Sub-todo 3.2.2: Create MapView component
- Added MapView with React-Leaflet, showing a map and marker for San Francisco.

Date: June 29, 2025, 3:48 AM IST Performed By: Prajith Ravisankar
---
### Sub-todo 3.2.3: Add zoom controls to map
- Integrated React-Leaflet's ZoomControl component.
- Placed controls at the top-right of the map for better UX.
- Disabled default zoomControl on MapContainer to avoid duplicates.
- Verified functionality in browser.

Date: June 29, 2025, 3:57 AM IST Performed By: Prajith Ravisankar
---
### Weather Overlay MVP Progress
- Added OpenWeatherMap tile overlay to map (tested: temp_new, wind_new, clouds_new).
- Noted that some layers (e.g., clouds_new) are not visually prominent or may not display as expected.
- Further tuning or alternative layer selection may be required for best UX.

Date: June 29, 4:38 PM 2025, Performed By: Prajith Ravisankar
---
### Sub-todo 3.3.1: Fetch disaster data
- Implemented getDisasterData() in frontend/src/services/disasterService.js to fetch from /api/disasters.
- MapView.jsx uses useEffect/useState to load and log disaster data on mount.
- Backend route /api/disasters returns mock data from mock-data/disasters.json for MVP.
- Data fetch verified in browser console.

Date: June 29, 2025 10:15 AM IST, Performed By: Prajith Ravisankar
---
### EONET-Compatible Mock Data for Disasters (Post 3.3.1)
- Refactored `mock-data/disasters.json` to match the EONET API structure (id, title, description, categories, geometry, etc.).
- Added 2–3 mock events for each EONET category, with realistic coordinates and dates.
- This approach ensures seamless transition to the real NASA EONET API with minimal code changes.
- Frontend and backend can now parse and display disaster events using the same data contract as the live API.
- Documented all available EONET categories for future filtering and UI enhancements.

Date: June 29, 2025 12:30 AM IST, Performed By: Prajith Ravisankar
---
### Sub-todo 3.3.2: Display disaster event markers
- Parsed EONET-style mock disaster data from `mock-data/disasters.json` in the frontend.
- Rendered a map marker for each event with Point geometry, covering all EONET categories.
- Popups display event title, description, category, and date for each marker.
- Verified that markers and popups appear correctly on the map after fixing backend path and proxy issues.

Date: June 29, 2025 1:31 PM IST, Performed By: Prajith Ravisankar
---
### Sub-todo 4.1.1: Create LocationForm component and persist locations in file
- Implemented LocationForm in frontend with fields for name, latitude, longitude, and submit button.
- Backend `/api/locations` now reads/writes to `mock-data/members.json` for all GET/POST/DELETE.
- Verified with Postman and frontend: new locations are saved to file and returned by API.
- Removed in-memory array from backend route; all location data is now file-based for MVP persistence.


Date: June 29, 2025, 3:40 PM IST, Performed By: Prajith Ravisankar
---
### Sub-todo 4.1.2: Validate LocationForm inputs and improve UX
- Added validation to LocationForm: checks for required fields, latitude/longitude ranges.
- Validation errors are shown below the button and disappear after 5 seconds.
- Form is styled horizontally and matches the Vite dark theme (bg-[#242424], indigo button, white text).
- Confirmed robust error handling and user feedback in the UI.

Date: June 29, 2025, 4:38 PM IST, Performed By: Prajith Ravisankar
---
### Sub-todo 4.2.1: Fetch and display locations on map and list
- Implemented `getLocations()` in locationService.js to fetch locations from backend.
- Used `useEffect` in both LocationList.jsx and MapView.jsx to load locations on mount.
- Locations now appear as custom markers on the map and as a list in the sidebar.
- Verified that adding a new location updates both the map and the list in real time.

Date: June 29, 2025, 10:30 PM IST, Performed By: Prajith Ravisankar




