# SafeGuard 🛡️
### *Real-time disaster monitoring and location safety tracker*

> **"Protecting people and places that matter most through intelligent disaster tracking and location management"**

---

## 🌟 **What is SafeGuard?**

SafeGuard is a comprehensive weather safety platform that combines **real-time disaster monitoring** with **personal location management** to keep you and your loved ones safe during emergencies. In an era of increasing natural disasters and climate uncertainty, SafeGuard bridges the gap between scattered weather apps and personal safety management.

## 🎯 **The Problem We Solve**

**Traditional weather apps tell you what's happening, but not how it affects the people and places you care about.**

- 📱 **Scattered Information**: Weather data, location tracking, and emergency contacts exist in separate apps
- ⏰ **Delayed Awareness**: Learning about threats to your loved ones' locations after it's too late  
- 🗺️ **No Unified View**: No single platform showing both real-time disasters AND your important locations
- 👥 **Isolation During Emergencies**: Difficulty coordinating safety across multiple locations and family members
- 📍 **Generic Alerts**: Weather warnings that don't consider your specific locations and circumstances

## ✨ **Our Solution**

SafeGuard creates a **unified safety command center** that monitors threats in real-time while keeping track of all the locations that matter to you.

### 🔥 **Core Features**

🗺️ **Interactive Safety Map**
- Real-time disaster tracking using NASA's EONET API (earthquakes, wildfires, storms, floods)
- Weather overlay integration with OpenWeatherMap
- Click anywhere to get precise GPS coordinates
- Visual representation of threats relative to your saved locations

📍 **Smart Location Management** 
- Save unlimited locations (home, work, family, friends) with custom details
- Each location includes member names, contact info, and place types
- User-specific data isolation - your locations stay private
- Address-to-coordinate conversion with intelligent suggestions

🎯 **Intelligent Proximity Search**
- Click any location to find nearest threats or safe zones
- Animated radial search expanding outward until matches are found
- Distance calculations using precise geographic algorithms
- Visual connection lines showing threat-to-location relationships

👤 **Personal Safety Network**
- Individual user accounts with secure authentication
- Private location storage per user
- Persistent sessions for quick access during emergencies
- Clean, stress-free interface designed for high-pressure situations

📱 **Universal Responsiveness**
- Full desktop experience with side-by-side map and controls
- Mobile-optimized touch interface for on-the-go monitoring  
- Adaptive layouts that scale from smartphones to ultrawide displays
- Consistent experience across all devices

## 🚀 **Why SafeGuard Matters**

### **For Families:**
- Monitor elderly parents' neighborhoods for severe weather
- Track threats near children's schools and activity locations
- Coordinate family safety during vacation travels
- Quick access to emergency contact information

### **For Communities:**
- Real-time awareness of local disaster events
- Shared understanding of regional safety conditions  
- Preparation and response coordination
- Neighborhood watch and mutual aid planning

### **For Emergency Preparedness:**
- Proactive threat monitoring before emergencies escalate
- Visual dashboard for quick situation assessment
- Location-based risk evaluation and planning
- Historical disaster tracking for pattern recognition

## 🏗️ **Technical Innovation**

SafeGuard leverages cutting-edge web technologies to deliver a seamless, real-time safety experience:

- **Frontend**: React + Vite with Leaflet.js mapping and Tailwind CSS styling
- **Backend**: Node.js + Express serving RESTful APIs
- **Real-time Data**: NASA EONET disaster feeds with intelligent fallback systems  
- **Mapping**: Interactive Leaflet maps with custom markers and animations
- **Geocoding**: Address-to-coordinate conversion with autocomplete suggestions
- **Responsive Design**: Mobile-first approach with desktop enhancement

## 🎪 **Perfect for Hackathons**

SafeGuard demonstrates:
- ✅ **Real-world impact** - Addresses genuine safety concerns
- ✅ **Technical complexity** - Multiple API integrations and real-time data processing  
- ✅ **User experience** - Intuitive interface designed for emergency scenarios
- ✅ **Innovation** - Novel combination of disaster monitoring and personal location management
- ✅ **Scalability** - Architecture ready for additional features and user growth

---

> **Note:** For MVP and rapid prototyping, we are using mock data (see `mock-data/disasters.json` and similar files) for disaster events and locations wherever necessary. This allows us to build and test the UI and core flows quickly. Real API integration will be added after the MVP is functional and tested.

## 🚀 How to Run the Project

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

### 📥 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/prajithravisankar/SOH-weather-safety-app.git
   cd SOH-weather-safety-app
   ```

2. **Set up Environment Variables**
   
   Create a `.env` file in the `backend/` directory:
   ```bash
   cd backend
   touch .env
   ```
   
   Add your API keys to the `.env` file:
   ```env
   OPENWEATHER_API_KEY=your_openweather_api_key_here
   PORT=5050
   ```
   
   Create a `.env` file in the `frontend/` directory:
   ```bash
   cd ../frontend
   touch .env
   ```
   
   Add the following to the frontend `.env`:
   ```env
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
   ```

3. **Install Dependencies**
   
   **Backend:**
   ```bash
   cd backend
   npm install
   ```
   
   **Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

### ▶️ Running the Application

You need to run both the backend server and frontend development server simultaneously.

#### Option 1: Using Two Terminals (Recommended)

**Terminal 1 - Backend Server:**
```bash
cd backend
node server.js
```
You should see: `Server running on http://localhost:5050`

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm run dev
```
You should see: `Local: http://localhost:5173/`

#### Option 2: Using Background Process
```bash
# Start backend in background
cd backend && node server.js &

# Start frontend in foreground
cd frontend && npm run dev
```

### 🌐 Accessing the Application

1. **Open your browser** and navigate to: `http://localhost:5173`
2. **Create an account** or login with existing credentials
3. **Start adding locations** and exploring disaster data on the interactive map!

### 🛠️ API Keys Setup

To get full functionality, you'll need an OpenWeatherMap API key:

1. **Sign up** at [OpenWeatherMap](https://openweathermap.org/api)
2. **Generate a free API key**
3. **Add the key** to both `.env` files as shown above

**Note:** The app will work without API keys using mock data, but weather overlays won't be available.

### 📱 Testing Different Devices

- **Desktop:** Full responsive layout with side-by-side map and location list
- **Mobile:** Stacked layout optimized for touch interactions
- **Tablet:** Adaptive layout that scales between mobile and desktop views

### 🔧 Troubleshooting

**Common Issues:**

1. **Port already in use:**
   - Backend: Change `PORT=5050` to another port in `backend/.env`
   - Frontend: Vite will automatically suggest an alternative port

2. **Dependencies not found:**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **API errors:**
   - Check that your OpenWeatherMap API key is valid
   - Ensure both `.env` files have the correct API key format

4. **Map not loading:**
   - Verify internet connection (required for map tiles)
   - Check browser console for JavaScript errors

### 🎯 Project Structure
```
weather-safety-app/
├── backend/                 # Express.js API server
│   ├── routes/             # API endpoints
│   ├── server.js           # Main server file
│   └── .env               # Backend environment variables
├── frontend/               # React + Vite application
│   ├── src/               # Source code
│   ├── public/            # Static assets
│   └── .env              # Frontend environment variables
├── mock-data/             # Sample data for testing
└── README.md             # This file
```

### 🧪 Development Notes

- **Backend runs on:** `http://localhost:5050`
- **Frontend runs on:** `http://localhost:5173`
- **API endpoints:** All backend APIs are prefixed with `/api/`
- **Data storage:** Uses JSON files for MVP (located in `mock-data/`)

**Ready to explore SafeGuard? Happy mapping! 🗺️✨**

---

## 🚀 **Future Roadmap & Vision**

SafeGuard's current MVP demonstrates core functionality, but we have ambitious plans to transform it into a comprehensive safety ecosystem. Here's our roadmap for addressing current shortcomings and expanding capabilities:

### 🎯 **Phase 1: Enhanced Core Features**

#### **Real-time Live Member Tracking**
- **GPS Integration**: Real-time location sharing for family members
- **Battery-aware Tracking**: Smart location updates that preserve device battery
- **Geofencing Alerts**: Notifications when family members enter/exit danger zones
- **Privacy Controls**: Granular permissions for who can see your location and when

#### **Advanced Disaster Intelligence**
- **Predictive Analytics**: AI-powered disaster path prediction and impact modeling
- **Multi-source Data Fusion**: Integration with NOAA, USGS, local emergency services
- **Severity Scoring**: Intelligent threat assessment with color-coded risk levels
- **Historical Analysis**: Pattern recognition for seasonal and regional disaster trends

#### **Smart Notifications & Alerts**
- **Push Notifications**: Instant alerts for threats near your saved locations
- **Escalation Protocols**: Progressive alerts based on threat proximity and severity
- **Smart Filtering**: AI-powered relevance filtering to reduce alert fatigue
- **Emergency Broadcasting**: Integration with local emergency alert systems

### 🏗️ **Phase 2: Platform & Infrastructure**

#### **Database & Scalability**
- **Migration to PostgreSQL**: Replace JSON storage with robust database
- **Real-time Synchronization**: WebSocket connections for instant updates
- **Cloud Infrastructure**: AWS/GCP deployment with auto-scaling
- **API Rate Limiting**: Professional API management and caching

#### **Enhanced Authentication & Security**
- **JWT Token Authentication**: Secure, stateless authentication system
- **OAuth Integration**: Login with Google, Apple, Microsoft accounts
- **End-to-end Encryption**: Secure location data and personal information
- **Two-factor Authentication**: Additional security for sensitive safety data

#### **Mobile Applications**
- **Native iOS App**: SwiftUI-based app with CoreLocation integration
- **Native Android App**: Kotlin app with background location services
- **Offline Capabilities**: Cached maps and emergency information without internet
- **Apple Watch/WearOS**: Quick safety status and emergency features

### 📱 **Phase 3: Community & Social Features**

#### **Family & Group Management**
- **Family Circles**: Shared location groups with different permission levels
- **Emergency Contacts**: Integrated contact management with one-tap communication
- **Group Coordination**: Real-time coordination tools for emergency situations
- **Child Safety Features**: Special modes for monitoring children's safety

#### **Community Safety Network**
- **Neighborhood Groups**: Local community disaster sharing and coordination
- **Crowd-sourced Reports**: User-submitted real-time disaster updates
- **Mutual Aid Coordination**: Connect neighbors for emergency assistance
- **Local Emergency Integration**: Direct connection with local first responders

#### **Social Safety Features**
- **Check-in System**: Quick "I'm safe" updates during emergencies
- **Emergency SOS**: One-touch emergency contact with location sharing
- **Safe Route Navigation**: AI-powered routing that avoids danger zones
- **Evacuation Planning**: Collaborative evacuation route planning and sharing

### 🤖 **Phase 4: AI & Advanced Intelligence**

#### **Predictive Safety AI**
- **Personal Risk Assessment**: AI models based on location patterns and history
- **Automated Recommendations**: Smart suggestions for safety preparations
- **Behavior Learning**: Adaptive systems that learn your routine and priorities
- **Scenario Planning**: "What-if" disaster simulations and response planning

#### **IoT & Smart Home Integration**
- **Weather Station Integration**: Connect personal weather monitoring devices
- **Smart Home Alerts**: Integration with home security and automation systems
- **Vehicle Integration**: CarPlay/Android Auto for mobile safety monitoring
- **Wearable Device Support**: Smartwatch notifications and health monitoring

#### **Advanced Analytics Dashboard**
- **Personal Safety Metrics**: Track your safety preparedness over time
- **Family Safety Score**: Comprehensive assessment of family emergency readiness
- **Regional Risk Analysis**: Detailed geographic risk assessment and trends
- **Insurance Integration**: Connect with insurance providers for risk-based benefits

### 🌍 **Phase 5: Global Expansion & Enterprise**

#### **Enterprise & Government Solutions**
- **Corporate Safety Management**: Employee safety monitoring for businesses
- **Educational Institution Plans**: School and university safety coordination
- **Government Partnerships**: Integration with national emergency management systems
- **First Responder Tools**: Professional emergency response coordination features

#### **Global Expansion**
- **International Disaster Data**: Global weather and disaster monitoring
- **Multi-language Support**: Localization for international markets
- **Regional Customization**: Country-specific emergency protocols and data sources
- **Cultural Adaptation**: Culturally appropriate safety practices and communication

### 🔧 **Current Shortcomings We're Addressing**

#### **Technical Limitations**
- **File-based Storage**: Moving to scalable database architecture
- **Basic Authentication**: Implementing enterprise-grade security
- **Limited API Sources**: Expanding to comprehensive disaster data federation
- **Manual Location Entry**: Adding automatic geocoding and location suggestions

#### **User Experience Gaps**
- **No Offline Mode**: Developing robust offline capabilities
- **Limited Customization**: Adding personalized safety preferences and workflows
- **Basic Notifications**: Implementing intelligent, context-aware alerting
- **Static Data**: Moving to real-time, dynamic safety information

#### **Scalability Concerns**
- **Single-user Focus**: Expanding to family and community safety management
- **Local Data Only**: Developing cloud-based synchronization and backup
- **Manual Monitoring**: Implementing automated threat detection and alerting
- **Limited Integration**: Building ecosystem partnerships and API integrations

### 💡 **Innovation Pipeline**

#### **Research & Development**
- **Machine Learning Models**: Disaster prediction and personal risk assessment
- **Augmented Reality**: AR-based safety information overlay in real environments
- **Blockchain Integration**: Decentralized emergency communication networks
- **Satellite Integration**: Direct satellite communication for extreme emergencies

#### **Emerging Technologies**
- **5G Edge Computing**: Ultra-low latency emergency response systems
- **Quantum Encryption**: Next-generation security for sensitive safety data
- **Digital Twins**: Virtual modeling of disaster scenarios and response planning
- **Brain-Computer Interfaces**: Future emergency communication technologies

---

## 🎖️ **Our Commitment**

SafeGuard is more than just a hackathon project—it's our commitment to **building a safer, more connected world**. We believe that technology should serve humanity's most fundamental need: **safety and security for ourselves and those we love**.

Every feature we build, every line of code we write, and every design decision we make is guided by this simple principle: **When disaster strikes, every second counts, and every person matters.**

**Join us in building the future of personal and community safety. Together, we can create a world where no one faces disaster alone.** 🛡️💙

---

*SafeGuard - Protecting people and places that matter most* ✨
