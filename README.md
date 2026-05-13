# 📚 AGC Library Management System

<div align="center">

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image_Storage-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)

### A full-featured, role-based Library Management System — digitizing book borrowing, reservations, fines, and analytics for modern academic libraries.

**🌐 Live Demo → [)**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Running the App](#-running-the-app)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Role-Based Access Control](#-role-based-access-control)
- [Deployment](#-deployment)

---

## 🔍 Overview

The **AGC Library Management System** is a production-ready full-stack web application that replaces paper-based library operations with a clean, modern digital platform. It supports three user roles — **Admin**, **Librarian**, and **Student** — each with a dedicated dashboard, tailored permissions, and a seamless experience powered by React 19 and a Node.js + MongoDB backend.

---

## 📸 Screenshots

### 🔐 Login Portal — Role Selection
> Clean role-based entry point — students, librarians, and admins each have a dedicated login flow.

![Login Portal](./screenshot_login_portal.png)

---

### 🛡️ Administrator Login
> Secure split-screen admin login with feature highlights — restricted to authorized personnel only.

![Admin Login](./screenshot_admin_login.png)

---

### 📊 Admin Dashboard
> Real-time operational overview — total books, students, librarians, borrowed items, category pie chart, and new acquisitions feed.

![Admin Dashboard](./screenshot_dashboard.png)

---

### 📈 Analytical Reports — Popular Titles
> Borrowing velocity bar chart with ranked book table — exportable as PDF for official library audits.

![Reports](./screenshot_reports.png)

---

## ✨ Features

### 👤 Student / Member
- 📖 Browse full book catalog with search and category filters
- 🔍 View detailed book info — availability, ISBN, publisher, description
- 📥 Request to borrow available books
- 🔁 Submit return requests for borrowed books
- 📌 Reserve unavailable books and get email notification when available
- 💸 View and track personal overdue fines
- 👤 View and update personal profile
- 🔑 Full auth flow — register, login, forgot password, OTP verify, reset password

### 📚 Librarian
- ✅ Review and approve student borrow requests
- ✅ Confirm returned books and update availability
- 📋 View all currently borrowed books
- 💰 View all fines and mark them as paid
- 🔖 View and manage reservations; notify next student in queue

### 🛡️ Admin *(Full Control)*
- 📊 Dashboard with live stats — books, students, librarians, borrowed items, collection utilization
- ➕ Add, edit, and delete books with Cloudinary cover image upload
- 👨‍💼 Add and delete librarian accounts
- 👥 Manage members — toggle Active/Inactive, view full borrow history
- ⚙️ Configure fine rules — rate per day, maximum cap, grace period
- 📈 Analytics reports — summary, issued, overdue, fines, most-borrowed, member activity
- 🔖 Manage all reservations — fulfill and notify actions

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.0 | UI Framework |
| Vite | 7.x | Build Tool & Dev Server |
| React Router DOM | 7.x | Client-side Routing |
| Axios | 1.15.0 | HTTP Client |
| Chart.js + react-chartjs-2 | 4.5.1 | Dashboard Charts |
| Framer Motion | 12.x | Page Animations |
| React Toastify | 11.x | Toast Notifications |
| React Hook Form | 7.x | Form Handling |
| Lucide React & React Icons | latest | Icon Libraries |
| jwt-decode | 4.x | JWT Token Parsing |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js + Express | 4.21 | REST API Server |
| MongoDB + Mongoose | 8.10 | Database & ODM |
| bcryptjs | 3.x | Password Hashing |
| jsonwebtoken | 9.x | JWT Auth Tokens |
| Cloudinary + Multer | 1.x | Image Upload & Storage |
| Nodemailer | 6.x | OTP & Email Notifications |
| dotenv | 16.x | Environment Config |
| cors | 2.x | Cross-Origin Requests |

---

## 📁 Project Structure

```
library-management-system/
│
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controller/
│   │   ├── admin.js                 # Admin logic
│   │   ├── books.js                 # Book CRUD & borrow logic
│   │   ├── fineController.js        # Fine generation & payment
│   │   ├── home.js                  # Home/dashboard data
│   │   ├── librarian.js             # Librarian operations
│   │   ├── reportController.js      # Reports & analytics
│   │   ├── reservationController.js # Reservation logic
│   │   └── user.js                  # User auth & profile
│   ├── middlewares/
│   │   ├── userAuth.js              # JWT verification
│   │   └── checkRole.js             # Role-based guard
│   ├── model/                       # Mongoose model bindings
│   ├── routes/                      # Express route definitions
│   ├── schemas/                     # Mongoose schema definitions
│   ├── utils/
│   │   ├── cache.js                 # In-memory caching
│   │   ├── cloudConfig.js           # Cloudinary + Multer config
│   │   └── fineCalculator.js        # Fine calculation logic
│   ├── .env
│   ├── index.js                     # App entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/              # Navbar, Footer, Preloader
    │   ├── layout/                  # UserLayout, AdminLayout
    │   ├── pages/
    │   │   ├── admin/               # Dashboard, Reports, Members, Fines…
    │   │   ├── auth/                # LoginPortal, AdminLogin, LibrarianLogin
    │   │   ├── librarian/           # Issue & Return requests
    │   │   └── user/                # Home, Books, Profile, Reservations…
    │   ├── lib/api.js               # Axios instance
    │   ├── utils/                   # Auth helpers, toast, config
    │   └── App.jsx                  # Root router
    ├── .env
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js **v18+**
- npm or yarn
- MongoDB Atlas account *(or local MongoDB)*
- Cloudinary account *(for book cover images)*
- Gmail account *(for OTP emails)*

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/agc-library-management.git
cd agc-library-management
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

---

## ▶️ Running the App

### Backend
```bash
cd backend

# First time only — seed the admin account into DB
node seedAdmin.js

# Start the server
npm start
```
> API runs at `http://localhost:5000`

### Frontend
```bash
cd frontend
npm run dev
```
> App opens at `http://localhost:5173`

---

## 🔐 Environment Variables

### `backend/.env`
```env
# MongoDB
MONGO_URI=your_mongodb_connection_string
DB_NAME=library

# JWT
JWT_SECRET=your_strong_secret_key

# Admin (must match seedAdmin.js)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Email (use Gmail App Password, not your real password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_SERVICE=gmail

# Server
PORT=5000
```

### `frontend/.env`
```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ **Never commit `.env` files.** Both are already in `.gitignore`.
> For Gmail, generate an **App Password** under Google Account → Security → 2-Step Verification.

---

## 📡 API Reference

### Users — `/users`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/users/register` | Public | Register new student |
| POST | `/users/login` | Public | Student login |
| GET | `/users/profile` | User | Get own profile |
| PUT | `/users/profile` | All roles | Update profile |
| POST | `/users/forgot-password` | Public | Send OTP to email |
| POST | `/users/verify-otp` | Public | Verify OTP code |
| POST | `/users/reset-password` | Public | Set new password |

### Books — `/books`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/books/` | Public | All books |
| GET | `/books/search` | Public | Search by title/author/ISBN |
| GET | `/books/categories` | Public | All categories |
| GET | `/books/:id` | Public | Single book detail |
| POST | `/books/add` | Admin/Librarian | Add book with cover image |
| PUT | `/books/update/:id` | Admin/Librarian | Edit book |
| DELETE | `/books/delete/:id` | Admin/Librarian | Delete book |
| POST | `/books/borrow/request-issue/:bookid` | User | Request to borrow |
| PUT | `/books/returnrequest/:id` | User | Submit return request |

### Admin — `/admin`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/admin/login` | Public | Admin/Librarian login |
| POST | `/admin/addlibrarian` | Admin | Create librarian |
| DELETE | `/admin/librarian/:id` | Admin | Delete librarian |
| GET | `/admin/members` | Admin | List all members |
| PUT | `/admin/users/:id/toggle` | Admin | Toggle Active/Inactive |
| GET | `/admin/fine-config` | Admin | Get fine settings |
| PUT | `/admin/fine-config` | Admin | Update fine settings |

### Reservations — `/reservations`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/reservations/reserve/:bookId` | User | Reserve a book |
| DELETE | `/reservations/cancel/:id` | User | Cancel reservation |
| GET | `/reservations/my` | User | My reservations |
| PUT | `/reservations/notify/:bookId` | Admin/Librarian | Notify next in queue |
| PUT | `/reservations/fulfill/:id` | Admin/Librarian | Fulfill reservation |

### Fines — `/fines`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/fines/generate/:borrowId` | Admin/Librarian | Generate fine |
| GET | `/fines/` | Admin/Librarian | All fines |
| GET | `/fines/my
