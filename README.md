# AGC Library Management System

<div align="center">

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image_Storage-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)

### A full-stack, role-based Library Management System for managing books, borrowing, reservations, fines, users, and analytics.

**Project Demo:** [View Live Application](https://your-project-demo-link.com)

</div>

---

## Overview

The **AGC Library Management System** is a production-style MERN stack web application built to digitize academic library operations. It replaces manual book issuing, return tracking, fine management, and reservation workflows with a centralized web platform.

The system supports three user roles: **Admin**, **Librarian**, and **Student**. Each role has a dedicated workflow, protected access, and features designed around real library operations.

---

## Key Highlights

- Role-based authentication and authorization using JWT
- Separate dashboards and workflows for Admin, Librarian, and Student users
- Book catalog management with Cloudinary image upload
- Borrow request, return request, and reservation management
- Overdue fine configuration, generation, and payment tracking
- Analytics and reports for library activity
- Email-based OTP and notification flow using Nodemailer
- Responsive React frontend built with Vite
- REST API backend using Node.js, Express, MongoDB, and Mongoose

---

## User Roles

### Student

- Browse books with search and category filters
- View book details, availability, ISBN, publisher, and description
- Request to borrow available books
- Submit return requests
- Reserve unavailable books
- Track personal overdue fines
- Update profile details
- Use forgot password, OTP verification, and password reset flows

### Librarian

- Approve or reject student borrow requests
- Confirm returned books and update availability
- View currently borrowed books
- Manage reservations and notify students
- View fines and mark them as paid

### Admin

- View dashboard statistics for books, students, librarians, borrowed items, and collection usage
- Add, edit, and delete books
- Create and remove librarian accounts
- Manage student/member accounts
- Configure fine rules such as daily rate, grace period, and maximum cap
- Access reports for issued books, overdue books, fines, popular titles, and member activity
- Manage all reservations

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | User interface |
| Vite 7 | Build tool and development server |
| React Router DOM | Client-side routing |
| Axios | API requests |
| Chart.js | Dashboard charts and analytics |
| Framer Motion | Page animations |
| React Toastify | User notifications |
| React Hook Form | Form handling |
| Lucide React / React Icons | Icons |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | REST API server |
| MongoDB | Database |
| Mongoose | ODM and schema modeling |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Cloudinary | Book cover image storage |
| Multer | File upload handling |
| Nodemailer | OTP and email notifications |
| dotenv | Environment configuration |

---

## Project Structure

```text
library-management-system/
+-- backend/
|   +-- config/              # Database configuration
|   +-- controller/          # Business logic
|   +-- middlewares/         # Auth and role guards
|   +-- model/               # Model bindings
|   +-- routes/              # API routes
|   +-- schemas/             # Mongoose schemas
|   +-- utils/               # Cache, Cloudinary, fine calculation
|   +-- index.js             # Backend entry point
|   +-- package.json
|
+-- frontend/
    +-- src/
    |   +-- components/      # Shared UI components
    |   +-- layout/          # User and admin layouts
    |   +-- pages/           # Role-based pages
    |   +-- lib/             # API configuration
    |   +-- utils/           # Auth and helper utilities
    |   +-- App.jsx          # App routes
    +-- vite.config.js
    +-- package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18 or above
- npm or yarn
- MongoDB Atlas account or local MongoDB setup
- Cloudinary account
- Gmail account with an app password for email features

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/agc-library-management.git
cd agc-library-management
```

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
DB_NAME=library
JWT_SECRET=your_strong_secret_key

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_SERVICE=gmail

PORT=5000
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000
```

---

## Running the Project

Start the backend:

```bash
cd backend
node seedAdmin.js
npm start
```

Start the frontend:

```bash
cd frontend
npm run dev
```

The backend runs on `http://localhost:5000` and the frontend runs on `http://localhost:5173`.

---

## Core Modules

- **Authentication:** Student registration/login, admin and librarian login, OTP password reset
- **Book Management:** Add, update, delete, search, filter, and view books
- **Borrowing:** Student issue requests and librarian approval flow
- **Returns:** Student return request and librarian confirmation flow
- **Reservations:** Queue-based reservation handling with notification support
- **Fines:** Configurable overdue fine rules and payment tracking
- **Reports:** Dashboard metrics and analytical reports for library operations

---

## Deployment

The application is designed for split deployment:

- **Frontend:** Vercel or Netlify
- **Backend:** Render, Railway, Cyclic, or similar Node.js hosting
- **Database:** MongoDB Atlas
- **Media Storage:** Cloudinary

Before deployment, configure production environment variables and update `VITE_API_URL` with the deployed backend URL.

---

## Project Purpose

This project demonstrates practical full-stack development skills, including REST API design, authentication, role-based access control, database modeling, file uploads, email workflows, dashboard analytics, and clean frontend architecture.
