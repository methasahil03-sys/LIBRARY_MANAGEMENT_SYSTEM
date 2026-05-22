const express = require("express");
const router = express.Router();
const { adminController } = require("../controller/admin");
const { userAuth } = require("../middlewares/userAuth");
const { checkRole } = require("../middlewares/checkRole");

const adminOnly = [userAuth, checkRole(["admin"])];
const staffAuth = [userAuth, checkRole(["admin", "librarian"])];

// Auth
router.post("/login", adminController.login);

// Librarian management
router.post("/addlibrarian", ...adminOnly, adminController.addLibrarian);
router.get("/librarians", ...adminOnly, adminController.getLibrarians);
router.delete("/librarian/:id", ...adminOnly, adminController.deleteLibrarian);

// Member management (admin + librarian)
router.get("/members", ...staffAuth, adminController.getMembers);
router.put("/users/:id/toggle", ...staffAuth, adminController.toggleUserStatus);
router.get(
  "/members/:id/history",
  ...staffAuth,
  adminController.getMemberBorrowHistory,
);

// Fine configuration (librarian: read-only; admin: read + update)
router.get("/fine-config", ...staffAuth, adminController.getFineConfig);
router.put("/fine-config", ...adminOnly, adminController.updateFineConfig);

module.exports = router;
