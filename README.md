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
