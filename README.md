# 📚 Library Management System

<div align="center">

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image_Hosting-3448C5?style=for-the-badge&logo=cloudinary)

A full-featured, role-based Library Management System built with the **MERN stack**. Manage books, members, borrowing, reservations, fines, and reports — all in one place.

**🌐 Live Demo:**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture & Data Models](#-architecture--data-models)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Role-Based Access Control](#-role-based-access-control)
- [Frontend Routes](#-frontend-routes)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🔍 Overview

This Library Management System is a complete, production-ready web application that digitizes library operations. It supports three distinct user roles — **Admin**, **Librarian**, and **Student (User)** — each with a tailored dashboard and specific permissions. Built with React 19 on the frontend and Express + MongoDB on the backend, the system handles everything from book cataloguing and borrowing to fines, reservations, and analytics reports.

---

## ✨ Features

### 👤 Student / Member
| Feature | Description |
|---|---|
| 📖 Browse Books | Browse the full catalog with search and category filters |
| 🔍 Book Details | View detailed book info including availability, ISBN, publisher |
| 📥 Borrow Request | Request to borrow available books |
| 🔁 Return Request | Submit a return request for borrowed books |
| 📌 Reservations | Reserve unavailable books and get notified when available |
| 💸 My Fines | View and track overdue fines |
| 👤 Profile | View and update personal profile |
| 🔑 Auth | Register, login, forgot password, OTP verification, reset password |

### 📚 Librarian
| Feature | Description |
|---|---|
| ✅ Approve Issue Requests | Review and approve student borrow requests |
| ✅ Approve Return Requests | Confirm returned books and update availability |
| 📋 Books Borrowed | View all currently borrowed books |
| 📑 Fine Management | View all fines; mark fines as paid |
| 🔖 Reservations | View and manage all reservations; notify students |

### 🛡️ Admin
| Feature | Description |
|---|---|
| 📊 Dashboard | Overview stats — total books, members, issued books, active students |
| ➕ Add / Edit / Delete Books | Full CRUD with Cloudinary image upload |
| 👨‍💼 Manage Librarians | Add and delete librarian accounts |
| 👥 Manage Members | View all members, toggle Active/Inactive status, view borrow history |
| ⚙️ Fine Configuration | Set fine rate per day, maximum fine cap, grace period |
| 📈 Reports | Summary, issued books, overdue, fine collection, most-borrowed, member activity |
| 🔖 All Reservations | Full view of all reservations with fulfill & notify actions |

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
| Framer Motion | 12.x | Animations |
| React Toastify | 11.x | Toast Notifications |
| React Hook Form | 7.x | Form Management |
| Lucide React & React Icons | latest | Icon Libraries |
| jwt-decode | 4.x | JWT Token Parsing |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js + Express | 4.21 | REST API Server |
| MongoDB + Mongoose | 8.10 | Database & ODM |
| bcryptjs | 3.x | Password Hashing |
| jsonwebtoken | 9.x | JWT Authentication |
| Cloudinary | 1.x | Book Cover Image Storage |
| Multer + multer-storage-cloudinary | 1.x | File Upload Middleware |
| Nodemailer | 6.x | Email (OTP, Notifications) |
| dotenv | 16.x | Environment Config |
| cors | 2.x | Cross-Origin Resource Sharing |

---

## 📁 Project Structure

```
library-management-system/
│
├── backend/
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controller/
│   │   ├── admin.js                # Admin business logic
│   │   ├── books.js                # Book CRUD & borrow logic
│   │   ├── fineController.js       # Fine generation & payment
│   │   ├── home.js                 # Dashboard/home data
│   │   ├── librarian.js            # Librarian operations
│   │   ├── reportController.js     # Reports & analytics
│   │   ├── reservationController.js# Reservation logic
│   │   └── user.js                 # User auth & profile
│   ├── middlewares/
│   │   ├── userAuth.js             # JWT verification middleware
│   │   └── checkRole.js            # Role-based access control
│   ├── model/                      # Mongoose model bindings
│   ├── routes/
│   │   ├── admin.js
│   │   ├── books.js
│   │   ├── fine.js
│   │   ├── home.js
│   │   ├── librarian.js
│   │   ├── report.js
│   │   ├── reservation.js
│   │   └── user.js
│   ├── schemas/                    # Mongoose schema definitions
│   ├── utils/
│   │   ├── cache.js                # In-memory caching
│   │   ├── cloudConfig.js          # Cloudinary + Multer setup
│   │   └── fineCalculator.js       # Fine calculation logic
│   ├── .env                        # Environment variables
│   ├── index.js                    # App entry point
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── navbar.jsx
    │   │   ├── adminnavbar.jsx
    │   │   ├── footer.jsx
    │   │   ├── AdminFooter.jsx
    │   │   └── preloader.jsx
    │   ├── layout/
    │   │   ├── userlayout.jsx      # Layout wrapper for public routes
    │   │   └── adminlayout.jsx     # Layout wrapper for admin routes
    │   ├── pages/
    │   │   ├── admin/              # Admin panel pages
    │   │   ├── auth/               # Login portal pages
    │   │   ├── librarian/          # Librarian pages
    │   │   └── user/               # Student/user pages
    │   ├── lib/
    │   │   └── api.js              # Axios instance & API helpers
    │   ├── utils/
    │   │   ├── auth.js             # Auth helpers
    │   │   ├── config.js           # App config
    │   │   └── toasthelper.js      # Toast utility
    │   ├── App.jsx                 # Root routing
    │   └── main.jsx
    ├── .env
    ├── vite.config.js
    └── package.json
```

---

## 🗄 Architecture & Data Models

### MongoDB Collections

#### `Users`
```js
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "admin" | "librarian" | "user",
  status: "Active" | "Inactive",
  createdAt: Date
}
```

#### `Books`
```js
{
  title: String,
  author: String,
  category: String,
  isbn: String (unique),
  totalCopies: Number,
  availableCopies: Number,
  price: Number,
  description: String,
  publisher: String,
  publicationYear: Number,
  coverImage: String (Cloudinary URL),
  cloudinaryId: String,
  addedBy: ObjectId → User
}
```

#### `BorrowedBooks`
```js
{
  userId: ObjectId → User,
  bookId: ObjectId → Book,
  status: "Requested" | "Issued" | "ReturnRequested" | "Returned",
  issueDate: Date,
  dueDate: Date,
  returnDate: Date
}
```

#### `Reservations`
```js
{
  userId: ObjectId → User,
  bookId: ObjectId → Book,
  status: "Pending" | "Notified" | "Fulfilled" | "Cancelled",
  reservedAt: Date
}
```

#### `Fines`
```js
{
  userId: ObjectId → User,
  borrowId: ObjectId → BorrowedBook,
  amount: Number,
  daysOverdue: Number,
  status: "Pending" | "Paid",
  paidAt: Date
}
```

#### `FineConfig`
```js
{
  ratePerDay: Number,   // fine per overdue day
  maxFineCap: Number,   // maximum fine limit
  gracePeriod: Number,  // days before fine kicks in
  updatedBy: ObjectId → User
}
```

#### `Otps`
```js
{
  email: String,
  otp: String,
  expiresAt: Date
}
```

---

## 📡 API Reference

### Auth & Users — `/users`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/users/` | Public | Get all users |
| POST | `/users/register` | Public | Register new user |
| POST | `/users/login` | Public | User login |
| GET | `/users/profile` | User | Get own profile |
| PUT | `/users/profile` | All roles | Update profile |
| POST | `/users/contact` | Public | Submit contact form |
| POST | `/users/forgot-password` | Public | Send OTP to email |
| POST | `/users/verify-otp` | Public | Verify OTP |
| POST | `/users/reset-password` | Public | Reset password |

### Books — `/books`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/books/` | Public | Get all books |
| GET | `/books/new` | Public | Get latest books |
| GET | `/books/search` | Public | Search by title/author/ISBN |
| GET | `/books/categories` | Public | Get all categories |
| GET | `/books/:id` | Public | Get single book |
| POST | `/books/add` | Admin/Librarian | Add new book (with image upload) |
| PUT | `/books/update/:id` | Admin/Librarian | Update book |
| DELETE | `/books/delete/:id` | Admin/Librarian | Delete book |
| GET | `/books/issued` | User | Get user's issued books |
| POST | `/books/borrow/request-issue/:bookid` | User | Request to borrow a book |
| PUT | `/books/return/:id` | User | Return a book |
| PUT | `/books/returnrequest/:id` | User | Submit return request |

### Admin — `/admin`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/admin/login` | Public | Admin/Librarian login |
| POST | `/admin/addlibrarian` | Admin | Create librarian account |
| GET | `/admin/librarians` | Admin | List all librarians |
| DELETE | `/admin/librarian/:id` | Admin | Delete a librarian |
| GET | `/admin/members` | Admin | List all members |
| PUT | `/admin/users/:id/toggle` | Admin | Toggle member Active/Inactive |
| GET | `/admin/members/:id/history` | Admin | Member borrow history |
| GET | `/admin/fine-config` | Admin | Get fine configuration |
| PUT | `/admin/fine-config` | Admin | Update fine configuration |

### Librarian — `/librarian`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/librarian/bookissued` | Admin/Librarian | View all issued books |
| GET | `/librarian/issuerequest` | Admin/Librarian | View issue requests |
| PUT | `/librarian/approverequest/:id` | Admin/Librarian | Approve issue request |
| GET | `/librarian/returnrequest` | Admin/Librarian | View return requests |
| PUT | `/librarian/approvereturnrequest/:id` | Admin/Librarian | Approve return request |

### Reservations — `/reservations`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/reservations/reserve/:bookId` | User | Reserve a book |
| DELETE | `/reservations/cancel/:id` | User | Cancel a reservation |
| GET | `/reservations/my` | User | Get own reservations |
| GET | `/reservations/` | Admin/Librarian | Get all reservations |
| PUT | `/reservations/notify/:bookId` | Admin/Librarian | Notify next user in queue |
| PUT | `/reservations/fulfill/:id` | Admin/Librarian | Fulfill a reservation |

### Fines — `/fines`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/fines/config` | Admin/Librarian | Get fine configuration |
| PUT | `/fines/config` | Admin | Update fine configuration |
| POST | `/fines/generate/:borrowId` | Admin/Librarian | Generate fine for a borrow record |
| GET | `/fines/` | Admin/Librarian | Get all fines |
| GET | `/fines/my` | User | Get own fines |
| PUT | `/fines/pay/:id` | Admin/Librarian | Mark fine as paid |

### Reports — `/reports`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/reports/summary` | Admin/Librarian | Overall summary stats |
| GET | `/reports/issued` | Admin/Librarian | Currently issued books |
| GET | `/reports/overdue` | Admin/Librarian | Overdue books |
| GET | `/reports/fines` | Admin/Librarian | Fine collection report |
| GET | `/reports/most-borrowed` | Admin/Librarian | Most borrowed books |
| GET | `/reports/member-activity` | Admin/Librarian | Member activity report |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Gmail account (for OTP emails)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (see [Environment Variables](#-environment-variables)).

```bash
# Seed the admin user into the database
node seedAdmin.js

# Start the backend server
npm start
```

The API will be running at `http://localhost:5000`.

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

The app will open at `http://localhost:5173`.

---

## 🔐 Environment Variables

### Backend — `backend/.env`

```env
# MongoDB
MONGO_URI=your_mongodb_connection_string
DB_NAME=library

# JWT
JWT_SECRET=your_strong_jwt_secret

# Admin credentials (used for first-time login, must match DB seed)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

# Cloudinary (book cover images)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Email (for OTP & notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_SERVICE=gmail

# Server
PORT=5000
```

> ⚠️ **Security Note:** Never commit your `.env` file to version control. The repository's `.gitignore` already excludes it. For Gmail, use an **App Password**, not your actual Gmail password.

### Frontend — `frontend/.env`

```env
VITE_API_URL=http://localhost:5000
```

---

## 🔒 Role-Based Access Control

The system implements a two-layer middleware guard on every protected route:

1. **`userAuth`** — Verifies the JWT token and attaches user info (`req.userInfo`) to the request.
2. **`checkRole`** — Verifies the user's role matches one of the allowed roles for that route.

```
Roles: admin | librarian | user
```

| Action | Admin | Librarian | User |
|---|:---:|:---:|:---:|
| Browse books | ✅ | ✅ | ✅ |
| Borrow books | ❌ | ❌ | ✅ |
| Reserve books | ❌ | ❌ | ✅ |
| Approve requests | ✅ | ✅ | ❌ |
| Add/Edit/Delete books | ✅ | ✅ | ❌ |
| Manage fines | ✅ | ✅ | ❌ |
| Configure fine rules | ✅ | ❌ | ❌ |
| Add/Delete librarians | ✅ | ❌ | ❌ |
| Toggle member status | ✅ | ❌ | ❌ |
| View reports | ✅ | ✅ | ❌ |

---

## 🗺 Frontend Routes

```
/                          → Home page
/books                     → All books catalog
/bookdetails/:id           → Single book detail
/category                  → Browse by category
/register                  → Student registration
/login                     → Student login
/login-portal              → Role selector (Admin/Librarian/Student)
/admin-login               → Admin login
/librarian-login           → Librarian login
/reservations              → My reservations (user)
/my-fines                  → My fines (user)
/aboutus                   → About page
/contactus                 → Contact form
/forgetPassword            → Forgot password
/verifyotp                 → OTP verification
/resetpass                 → Reset password
/user                      → User profile

/admin                     → Admin dashboard
/admin/addbook             → Add new book
/admin/viewbook            → View & manage books
/admin/addlibrarian        → Add librarian
/admin/issuerequest        → Book issue requests
/admin/returnrequest       → Book return requests
/admin/issued              → Currently issued books
/admin/members             → Manage members
/admin/reservations        → All reservations
/admin/fines               → Fine management
/admin/fine-config         → Fine configuration
/admin/reports             → Reports & analytics
```

---

## 🌐 Deployment

### Backend (Render / Railway / Cyclic)

1. Push your backend code to a GitHub repository.
2. Create a new Web Service on your hosting platform.
3. Set the **Build Command** to `npm install` and **Start Command** to `npm start`.
4. Add all environment variables from `backend/.env` in the platform's dashboard.

### Frontend (Vercel)

1. Push your frontend code to a GitHub repository.
2. Import the project in [Vercel](https://vercel.com).
3. Set the **Framework Preset** to `Vite`.
4. Add `VITE_API_URL` pointing to your deployed backend URL.
5. Deploy!

> The CORS configuration in `index.js` already includes the Vercel domain. Update `allowedOrigins` if you use a custom domain.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please follow the existing code style and include meaningful commit messages.

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

Made with ❤️ using the MERN Stack

⭐ Star this repo if you found it helpful!

</div>
