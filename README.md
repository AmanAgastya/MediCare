# 🏥 MediCare — MERN based Full-Stack Healthcare Management Platform
  OPDs Queue, Bed Allocation in Hospital and Healthcare Management System.
> A comprehensive healthcare web application that connects patients, hospitals, and doctors on a single platform — enabling appointment booking, queue management, check bed availability, donation coordination, medicine ordering, AI-assisted diagnosis, and a live admin control panel.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **APIs**: Groq API Key
- **Deployment**: Render
---

## Acknowledgments
 - **Contributors**:
   -Aman Agastya - amanagastya255@gmail.com
---
The code for Project is Deployment Ready and Deployed on Render.com, it doesn't run on local server.
Frontend_URL : https://medicare-frontend-qlam.onrender.com/
     Admin Pannel URL : https://medicare-backend-s1y1.onrender.com/admin/
     
---
## 📋 Table of Contents
   1. Project Overview
   2. Features
   3. Tech Stack
   4. Project Structure
   5. Getting Started
   6. Environment Variables
   7. User Roles & Access
   8. Admin Panel
   9. Database Models
---

## Project Overview

MediCare is a MERN-stack (MongoDB, Express, React, Node.js) healthcare platform with three types of users — **Patients (Users)**, **Hospitals**, and **Doctors** — all managed by a **Super Admin** through a standalone HTML admin panel backed directly by the Express API.

The platform covers the full patient journey: from finding a hospital and booking an appointment, receiving a queue token, consulting a doctor who writes reports and suggests tests, through to ordering medicines and tracking the delivery.
---

## Features

   ### 👤 Patient (User)
    | Feature | Description |
    |---|---|
    | Registration & Login | JWT-based auth with bcrypt password hashing |
    | Health Profile | Blood group, allergies, chronic conditions, medications, emergency contact |
    | Appointment Booking | Book with any hospital & doctor, request bed allocation |
    | Queue Token | Real-time token number issued on appointment acceptance |
    | Notifications | Alerts for bed allocation & queue token |
    | Lab Test Records | Add, edit, delete personal lab results |
    | Medical History | Full history of appointments and health records |
    | Medicine Store | Browse and buy medicines from the MedStore |
    | Cart & Checkout | Cart management, address, payment method selection |
    | Order Tracking | View all orders and their current delivery status |
    | Donations | Donate blood, pledge organs, contribute financial aid |
    | AI Chatbot (Vaidya) | Groq powered health assistant |
    | Depression Test | Mental health self-assessment tool |
    | AI Diagnosis | Symptom-based AI diagnosis suggestions |
    | Diet Planner | Personalized diet suggestions |
    | Telemedicine | Virtual consultation interface |

   ### 🏥 Hospital
    | Feature | Description |
    |---|---|
    | Registration & Login | Hospital-specific JWT auth |
    | Dashboard | Stats — total patients, appointments, beds, doctors on duty |
    | Appointment Management | Accept / deny appointments |
    | Queue Management | Per-doctor, per-date token system (tokens reset to 1 each new day) |
    | Bed Management | Track and allocate available beds |
    | Doctor Management | Add, remove, update doctors; optionally enable doctor login |
    | Donation Requests | Raise blood / organ / financial donation requests |

   ### 🩺 Doctor
    | Feature | Description |
    |---|---|
    | Login | Separate doctor credentials set by hospital admin |
    | Dashboard | Today's queue + all assigned appointments |
    | Status Updates | Mark appointments as Running or Done |
    | Consultation Report | Write diagnosis, prescription, notes, follow-up date |
    | Test Suggestions | Suggest lab tests per patient (Routine / Urgent / Emergency) |

   ### 🔑 Super Admin (Admin Panel)
    | Feature | Description |
    |---|---|
    | Hospital Management | Approve, reject, delete hospitals |
    | User Management | View all registered users fetched live from MongoDB |
    | Medicine Orders | View all orders, update delivery status per order |
    | Donation Management | Manage blood, organ, financial donations; match donors to hospitals |
    | Feedback Management | Read, reply to, and resolve user feedback |
    | Activity Log | Recent hospital registration and approval timeline |
    | Live Stats | Counts for hospitals, users, orders, donations |

---

## Tech Stack

  ### Backend
   | Package | Purpose |
   |---|---|
   | **Node.js + Express** | REST API server |
   | **MongoDB Atlas + Mongoose** | Database & ODM |
   | **bcryptjs** | Password hashing |
   | **jsonwebtoken** | JWT authentication |
   | **cors** | Cross-origin requests |
   | **dotenv** | Environment variable management |

  ### Frontend
   | Package | Purpose |
   |---|---|
   | **React 18** | UI framework |
   | **React Router DOM** | Client-side routing |
   | **Axios** | HTTP client |
   | **Lucide React** | Icon library |
   | **MUI / Material UI** | Component library |
   | **Framer Motion** | Animations |
   | **@groq/generative-ai** | Groq AI integration (Vaidya chatbot, diagnosis) |
   | **country-state-city** | Location dropdowns |
   | **react-markdown** | Markdown rendering for AI responses |

  ### Admin Panel
   - Standalone `admin-panel.html` served at `/admin` by Express
   - Vanilla JS + CSS — no framework dependency
   - Connects directly to the Express API using JWT stored in `sessionStorage`

---

## Project Structure

```
MediCare/
├── backend/
│   ├── middleware/
│   │   ├── auth.js              # JWT decoder (user / hospital / doctor)
│   │   └── roleCheck.js         # Role-based access control
│   ├── models/
│   │   ├── User.js              # Patient schema + lab tests
│   │   ├── Hospital.js          # Hospital + doctors + queue + token counters
│   │   ├── Appointment.js       # Appointment + doctor report + test suggestions
│   │   ├── Order.js             # Medicine order schema
│   │   ├── Donation.js          # Blood / organ / financial donations
│   │   └── Feedback.js          # User feedback
│   ├── routes/
│   │   ├── auth.js              # User auth + profile + appointments + lab tests
│   │   ├── hospitalAuth.js      # Hospital auth + queue + doctor dashboard routes
│   │   ├── admin.js             # Admin — users, orders, hospitals, feedback
│   │   ├── order.js             # Order create / fetch / status update
│   │   ├── donations.js         # Donation requests and offers
│   │   └── ai.js                # AI / Gemini routes
│   ├── public/
│   │   └── admin-panel.html     # Standalone admin UI
│   ├── scripts/
│   │   └── createSuperAdmin.js  # One-time script to seed the admin account
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/          # All React page components
    │   ├── context/
    │   │   └── AuthContext.js   # Global auth state
    │   ├── services/
    │   │   └── api.js           # Centralised API helpers
    │   └── App.js               # Routes
    └── .env
```

---

## Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher
- A **MongoDB Atlas** account (free tier works)

### 1 — Clone the repository

```bash
git clone <your-repo-url>
cd MediCare
```

### 2 — Set up the backend

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
atlas_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=MedCare
JWT_SECRET=your_strong_secret_here
GROQ_API_KEY=your_groq_api_key_here
```

### 3 — Create the Super Admin account
Run this **once** to seed the admin user into MongoDB:

```bash
node scripts/createSuperAdmin.js
```

This creates:
- **Email:** `admin@medicare.com`
- **Password:** `admin123` *(change immediately after first login)*

### 4 — Start the backend

```bash
node server.js
# or with auto-reload:
npx nodemon server.js
```

Server starts at `http://localhost:5000`
Admin panel at `http://localhost:5000/admin`

### 5 — Set up the frontend

```bash
cd ../frontend
npm install
```

Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000
```

### 6 — Start the frontend

```bash
npm start
```

Frontend runs at `http://localhost:3000`

### 7 - The code for Project is Deployment Ready and Deployed on Render.com, it doesn't run on local server.
Frontend_URL : https://medicare-frontend-qlam.onrender.com/
     Admin Pannel URL : https://medicare-backend-s1y1.onrender.com/admin/
---

## Environment Variables

| Variable | File | Description |
|---|---|---|
| `PORT` | backend/.env | Express server port (default 5000) |
| `atlas_URI` | backend/.env | MongoDB Atlas connection string |
| `JWT_SECRET` | backend/.env | Secret key for signing JWTs |
| `GROQ_API_KEY` | backend/.env | Groq API key for AI features |
| `REACT_APP_API_URL` | frontend/.env | Base URL for API calls from React |

---

## User Roles & Access

| Role | Login URL | Access |
|---|---|---|
| **User / Patient** | `/user-login` | Dashboard, appointments, store, donations |
| **Hospital Admin** | `/hospital-login` | Hospital dashboard, queue, doctor management |
| **Doctor** | `/doctor-login` | Doctor dashboard, patient queue, reports |
| **Super Admin** | `http://localhost:5000/admin` | Full admin panel |

---

## Admin Panel

Access: **`http://localhost:5000/admin`**

Login with the super admin credentials created by `createSuperAdmin.js`.

### Sections
| Section | What it shows |
|---|---|
| **Dashboard** | Live counts — hospitals, users, orders, donations |
| **Hospitals** | All hospitals; approve, reject, delete; view doctors |
| **Users** | All registered patients fetched live from MongoDB |
| **Orders** | All medicine orders; inline status dropdown to update delivery |
| **Donations** | Blood / organ / financial — match donors to hospital requests |
| **Feedback** | Read and reply to user feedback |
| **Activity Log** | Hospital registration and approval timeline |

---

## Database Models

### User
`name · email · password · phone · role · bloodGroup · dateOfBirth · gender · address · allergies[] · chronicConditions[] · currentMedications[] · emergencyContact{} · labTests[]`

### Hospital
`hospitalName · email · password · phone · address · state · city · doctors[] · queue[] · doctorTokenCounters[] · availableBeds · totalBeds · accepted`

### Appointment
`fullName · email · phoneNumber · date · time · hospital · doctor{} · status · queueToken · bedAllocated · doctorReport{} · testSuggestions[]`

### Order
`user · items[] · totalAmount · address{} · paymentMethod · paymentStatus · orderStatus`

### Donation
`requestType · donationType · hospitalId · donorName · bloodGroup · organType · amountOffered · status · adminNote · matchedWith`
