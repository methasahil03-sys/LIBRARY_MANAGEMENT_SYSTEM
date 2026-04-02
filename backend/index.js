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
const report      = require("./routes/report.js");        // ✅ NEW