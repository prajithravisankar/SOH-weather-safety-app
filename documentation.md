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
---
### Sub-todo 4.2.1: Fetch and display locations on map and list
- Implemented `getLocations()` in locationService.js to fetch locations from backend.
- Used `useEffect` in both LocationList.jsx and MapView.jsx to load locations on mount.
- Locations now appear as custom markers on the map and as a list in the sidebar.
- Verified that adding a new location updates both the map and the list in real time.

Date: June 29, 2025, 11:45 PM IST, Performed By: Prajith Ravisankar
---
### Sub-todo 4.2.2: Complete location list with sidebar layout and interactive features
- Implemented LocationList component with sidebar layout, scrollable area (max-h-80) for long lists.
- Added click-to-pan functionality: clicking a location in the list centers the map on those coordinates.
- Integrated delete functionality with trash icon buttons and proper error handling.
- Added `deleteLocation()` function to locationService.js for DELETE requests to backend.

Date: June 29, 2025, 11:45 PM IST, Performed By: Prajith Ravisankar
---
### UI/UX Layout Improvements and Marker Differentiation
- Restructured App.jsx layout: map and location list side-by-side, form moved below map.
- Improved responsive design with flexbox: desktop shows sidebar, mobile stacks vertically.
- Implemented custom marker colors: green markers for user locations, red markers for disaster events.
- Added ChangeView component to MapView for smooth map panning when clicking locations.
- Enhanced LocationForm: horizontal layout on desktop, all inputs + button in one row.
- Added proper visual hierarchy with dark theme styling and better spacing.
---
### Phase 5: API Resilience & Fallbacks - NASA EONET Integration
- Integrated NASA EONET API (v3) in backend `/api/disasters` route to fetch real-time global disaster events.
- Implemented robust error handling: if EONET API fails or is unavailable, backend automatically falls back to local mock data (`mock-data/disasters.json`).
- No changes required in frontend: data structure matches EONET API, so UI updates seamlessly.
- Verified in browser and terminal: real events display on map, fallback works if API is unreachable.
- This completes Phase 5 core requirements for API resilience and real-world data integration.
---
### Main Todo 8.1: Backend User Authentication Completed
- Created `mock-data/users.json` to store user accounts as an array of objects with username, password, and createdAt fields.
- Implemented `/api/auth/register` route to allow new user registration, ensuring unique usernames and proper error handling for empty or missing files.
- Implemented `/api/auth/login` route to authenticate users against stored credentials.
- Both endpoints return clear success/error messages and are ready for frontend integration.
- Tested registration and login with curl and confirmed correct file updates and responses.

Date: June 29, 2025, 7:29 PM IST, Performed By: Prajith Ravisankar
---
### Main Todo 8.2: User-Specific Location Storage Completed
- Deleted legacy `members.json` and created user-specific location files (e.g., `testuser-locations.json`).
- Updated backend `/api/locations` routes to require username for all operations.
- Each user's locations are now stored and managed in their own file, ensuring complete data isolation.
- Helper functions handle file reading/writing and auto-create files for new users.
- Tested GET, POST, and DELETE endpoints for multiple users and confirmed correct file updates and data isolation.

Date: June 29, 2025, 8:03 PM IST, Performed By: Prajith Ravisankar
---
### Sub-todo 8.3.1: Create authentication components completed
- Implemented `LoginForm.jsx` for user login with validation and error handling.
- Implemented `SignupForm.jsx` for user registration with password confirmation and validation.
- Implemented `AuthPage.jsx` to toggle between login and signup forms and handle authentication state.
- All components styled to match the app's dark theme and tested for correct UI/UX.

Date: June 29, 2025, 8:20 PM IST, Performed By: Prajith Ravisankar
---
### Sub-todo 8.3.2: Add authentication flow to App completed
- Updated `App.jsx` to manage login state, persist user in localStorage, and show `AuthPage` if not logged in.
- Integrated logout button and welcome message in the app header.
- Passed username to all location-related components and API calls for user-specific data.
- Verified that authentication flow works end-to-end and user experience is seamless.
---
Date: June 29, 2025, 9:11 PM IST Performed By: Prajith Ravisankar
---
### Phase 8: User Authentication & Data Isolation
- Implemented user registration and login with `/api/auth` endpoints and `mock-data/users.json`.
- Each user now has their own `{username}-locations.json` file for location storage.
- Backend (`locations.js`) requires username for all location endpoints and isolates data per user.
- Frontend services/components updated to always pass username for location API calls.
- **Critical bug fix:** Removed a conflicting useEffect in `MapView.jsx` that was overwriting locations with an empty array after login. Now, locations display immediately after login for each user.
- Tested with users `john` and `prajith`—locations render instantly after login.
- All user-specific data flows confirmed working as of 9:11 PM IST.

**Tested users:**
- `john` (shows 4 locations after login)
- `prajith` (shows 1 location after login)

**Status:**
- All user-specific location and authentication flows are working as intended as of 9:11 PM IST, June 29, 2025.
---

# Basic MVP completed - Prajith Ravisankar (Sun, Jun 29, 9:22 PM)



