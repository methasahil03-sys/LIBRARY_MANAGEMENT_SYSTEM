




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
