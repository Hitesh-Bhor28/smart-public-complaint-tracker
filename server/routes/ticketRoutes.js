const express = require("express");
const router = express.Router();
const {
    getAllTickets,
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
    upvoteTicket,
    assignWorker,
} = require("../controllers/ticketController");
const upload = require("../middlewares/upload");

// TODO: Add auth middleware to protected routes
// const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(getTickets).post(createTicket);
router.route("/create").post(upload.single("image"), createTicket);
router.route("/all").get(getAllTickets);
router.route("/assign/:id").patch(assignWorker);
router.route("/:id/upvote").post(upvoteTicket);
router.route("/:id").get(getTicket).put(updateTicket).delete(deleteTicket);

module.exports = router;
