const express = require("express");
const router = express.Router();
const { getAssignedTasks, updateTaskStatus, resolveTask, confirmResolution } = require("../controllers/issueController");
const upload = require("../middlewares/upload");

router.get("/tasks", getAssignedTasks);
router.patch("/:id/status", updateTaskStatus);
router.post("/:id/resolve", upload.single("image"), resolveTask);
router.patch("/confirm/:issueId", confirmResolution);

module.exports = router;
