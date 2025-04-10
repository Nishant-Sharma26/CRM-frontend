CRM Frontend - Hey, Check This Out!
Hey there! This is the frontend for my CRM project—a slick little React app that ties into my backend to manage candidates. I’ve packed it with some neat features using Redux for state, Material-UI for the fancy components, and Tailwind CSS to make it look good. It talks to my backend at https://crm-backend-woad.vercel.app (or locally if I’m testing). Here’s the rundown on what it does and how to get it going!

What’s Inside (Features)
Login/Signup Vibes:
Got a form (AuthForm.js) where you can sign up or log in with an email and password. It’s got a cool loading spinner while it talks to the backend, and once you’re in, it saves a token and whisks you to the dashboard.
Candidate Dashboard (Dashboard.js):
Shows a table of all the candidates—name, email, phone, job title, status, and a link to their resume if they’ve got one.
You can filter by job title (type to search) or status (pick from a dropdown: Pending, Reviewed, Hired).
Change a candidate’s status with a dropdown, and it updates right away thanks to Redux.
Delete button with a confirmation pop-up—trashes a candidate and pops a toast to let you know it worked (or didn’t).
Metrics Section (Metrics.js):
A quick grid showing how many candidates total, plus counts for Pending, Reviewed, and Hired. Each one’s got its own color-coded card—looks pretty snazzy!
State Management:
Redux keeps everything in check—fetches candidates, updates statuses, and handles deletes. It’s all wired up with actions and a reducer.
Look & Feel:
Material-UI handles the forms, tables, buttons, and icons—keeps it clean and pro.
Tailwind CSS for extra styling flair—makes the layout pop and responsive.
Toast notifications (via react-toastify) for when you delete stuff—success or error, it’ll tell ya.
Navigation:
React Router takes you from the login/signup page (/) to the dashboard (/dashboard) after you’re authenticated. No manual refresh needed!


How to Run It Locally
Here’s how to get this thing spinning on your machine:

What You’ll Need
Node.js: Grab 14 or higher—older versions might trip up.
npm: Comes with Node, so you’re good.
Backend: Make sure the backend’s up (check its README—I’ve got it at https://crm-backend-woad.vercel.app or http://localhost:5000 locally).
Steps
Grab the Code:
Clone it from GitHub:

git clone https://github.com/Nishant-Sharma26/CRM-frontend.git
cd CRM-frontend


npm install

npm start


Assumptions & Stuff to Watch Out For
Assumptions
Backend: I’m counting on the backend being live at https://crm-backend-woad.vercel.app (or local at http://localhost:5000) with endpoints for auth and candidates. It’s gotta send back tokens and data like { _id, name, email, phone, jobTitle, status, resumeUrl }.
CORS: The backend’s cool with requests from http://localhost:3000 and https://crm-frontend-umber-rho.vercel.app—I’ve set that up on the server side.
React Setup: Built this with Create React App and added Tailwind manually—pretty standard stuff.

Limitations


First Load: If the backend’s CORS isn’t spot-on, you might hit a 401 error on the first fetch—fixed it with the backend tweaks, but double-check that.
by the way i have solved this bug.
Errors: I’ve got basic alerts and toasts for screw-ups, but it’s not super fancy—could use a retry option or something.
No Offline Mode: This thing needs the backend to work—no local storage or offline tricks yet.
Single User: It’s set up for one user at a time—haven’t messed with roles like admin vs. regular user.
Styling Mix: Using both Material-UI and Tailwind—looks good, but I gotta keep an eye on consistency.
Testing: Haven’t thrown in any tests yet, so you’ll need to poke it manually to make sure it’s solid.