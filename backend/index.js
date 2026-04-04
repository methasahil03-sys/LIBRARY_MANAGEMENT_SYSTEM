const express   = require("express");
const cors      = require("cors");
const mongoose  = require("mongoose");
const dotenv    = require("dotenv");
const path      = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// ── Routes ──────────────────────────────────────────────────────
const users       = require("./routes/user.js");
const books       = require("./routes/books.js");
const admin       = require("./routes/admin.js");
const librarian   = require("./routes/librarian.js");
const home        = require("./routes/home.js");
const reservation = require("./routes/reservation.js");  // ✅ NEW
const fine        = require("./routes/fine.js");          // ✅ NEW
const report      = require("./routes/report.js");        // ✅ NEw

const allowedOrigins = [
  "http://localhost:5173",
  "https://library-management-app-karan.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());



app.use("/users",        users);
app.use("/books",        books);
app.use("/admin",        admin);
app.use("/librarian",    librarian);
app.use("/home",         home);
app.use("/reservations", reservation);  // ✅ NEW
app.use("/fines",        fine);         // ✅ NEW
app.use("/reports",      report);       // ✅ NEW

app.get("/", (_req, res) => res.send("✅ Library Management API is running..."));