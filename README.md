Hosted on https://crm-frontend-umber-rho.vercel.app/



CRM Frontend
This is the frontend application for a Customer Relationship Management (CRM) system built with React, Redux, Material-UI, and Tailwind CSS. It interacts with a backend API hosted at https://crm-backend-woad.vercel.app to manage candidate data, including authentication, candidate listing, status updates, and metrics visualization.

Features Implemented -
Authentication:
Signup/Login Form: Users can sign up or log in using email and password via a responsive form (AuthForm.js).
Loading Indicator: Displays a spinner during API calls for signup/login.
Token Management: Stores JWT in localStorage and propagates it to the app state.
Candidate Dashboard (Dashboard.js):
Candidate List: Displays a table of candidates with name, email, phone, job title, status, resume link, and delete action.
Filters: Filter candidates by job title (text search) and status (dropdown).
Status Updates: Change candidate status (Pending, Reviewed, Hired) via dropdown, with real-time Redux updates.
Delete Functionality: Remove candidates with confirmation prompt and toast notifications.
Metrics Dashboard (Metrics.js):
Candidate Stats: Shows total, pending, reviewed, and hired candidate counts in a grid layout with color-coded cards.
State Management:
Redux: Manages candidate data with actions (fetchCandidates, updateStatus, deleteCandidate) and a reducer.
UI/UX:
Material-UI: Used for forms, tables, buttons, and icons.
Tailwind CSS: Custom styling for layout and responsiveness.
Toast Notifications: Success/error messages for delete actions using react-toastify.
Routing:
React Router: Navigates between / (auth) and /dashboard after successful login/signup.
Steps to Run the Project Locally
Prerequisites
Node.js: Version 14.x or higher.
npm: Comes with Node.js.
Backend: Ensure the backend (https://crm-backend-woad.vercel.app) is running or set up locally (see backend README).
Installation
Clone the Repository:
bash

Collapse

Wrap

Copy
git clone https://github.com/Nishant-Sharma26/CRM-frontend.git
cd CRM-frontend
Install Dependencies:
bash

Collapse

Wrap

Copy
npm install
Installs React, Redux, Material-UI, Tailwind CSS, Axios, React Router, and other dependencies listed in package.json.
Configure Environment:
Create a .env file in the root directory:
text

Collapse

Wrap

Copy
REACT_APP_API_URL=https://crm-backend-woad.vercel.app
For local testing, replace with http://localhost:5000 if running the backend locally.
Run the Application:
bash

Collapse

Wrap

Copy
npm start
Starts the development server at http://localhost:3000.
The app should open in your default browser.
Test Features:
Navigate to / to sign up or log in.
After authentication, you’ll be redirected to /dashboard to view candidates and metrics.
Build for Production
bash

Collapse

Wrap

Copy
npm run build
Creates an optimized build in the build/ folder for deployment (e.g., on Vercel).
Assumptions and Limitations
Assumptions
Backend Availability: Assumes the backend API at https://crm-backend-woad.vercel.app (or http://localhost:5000 locally) supports:
/api/auth/signup and /api/auth/login for authentication (POST).
/api/candidates for fetching (GET), adding (POST), updating status (PUT), and deleting (DELETE) candidates.
Returns JWT tokens and candidate data in expected formats (e.g., { token }, { _id, name, email, phone, jobTitle, status, resumeUrl }).
CORS: Backend is configured to allow CORS requests from http://localhost:3000 and https://crm-frontend-umber-rho.vercel.app.
React Setup: Assumes a standard Create React App structure with Tailwind CSS integrated manually.
Limitations
Initial Data Fetch: If the backend rejects the first /api/candidates request (e.g., due to CORS or token issues), a refresh might still be needed unless backend CORS is fully resolved.
Error Handling: Basic error alerts/toasts are implemented; more robust UI feedback (e.g., retry buttons) could be added.
No Offline Support: Relies on backend connectivity; no local caching or offline mode.
Single User: Assumes a single-user context; multi-user roles (e.g., admin vs. viewer) aren’t implemented.
Styling: Tailwind CSS and Material-UI are mixed, which might lead to inconsistent design if not carefully managed.
Testing: No unit/integration tests are included—manual testing is required.
