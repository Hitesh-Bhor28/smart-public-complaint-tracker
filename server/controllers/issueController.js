const Issue = require("../models/Issue");
const Ticket = require("../models/Ticket");

const getUserRole = (req) =>
  req.auth?.sessionClaims?.publicMetadata?.role ||
  req.user?.role ||
  req.headers["x-user-role"];

// @desc    Get assigned tasks for a staff member
// @route   GET /api/issues/tasks
// @access  Private (expects userId)
const getAssignedTasks = async (req, res) => {
  try {
    const userId =
      req.auth?.userId ||
      req.user?.id ||
      req.query?.userId ||
      req.headers["x-user-id"];
    const role = getUserRole(req);

    if (!userId) {
      return res.status(401).json({ message: "User ID required" });
    }

    if (role !== "worker") {
      return res.status(403).json({ message: "Worker access only" });
    }

    const tasks = await Ticket.find({
      assignedTo: userId,
      status: { $ne: "Closed" },
    }).sort({ createdAt: -1 });

    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assigned tasks" });
  }
};

// @desc    Update task status
// @route   PATCH /api/issues/:id/status
// @access  Private
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const role = getUserRole(req);
    const userId =
      req.auth?.userId ||
      req.user?.id ||
      req.headers["x-user-id"];

    if (role !== "worker") {
      return res.status(403).json({ message: "Worker access only" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (status === "Completed" || status === "Closed") {
      return res.status(400).json({ message: "Resolution proof is required" });
    }

    const updated = await Ticket.findOneAndUpdate(
      { _id: id, assignedTo: userId },
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ data: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

// @desc    Resolve task with proof
// @route   POST /api/issues/:id/resolve
// @access  Private
const resolveTask = async (req, res) => {
  try {
    const { id } = req.params;
    const role = getUserRole(req);
    const userId =
      req.auth?.userId ||
      req.user?.id ||
      req.headers["x-user-id"];

    if (role !== "worker") {
      return res.status(403).json({ message: "Worker access only" });
    }

    if (!req.file?.path) {
      return res.status(400).json({ message: "Resolution photo is required" });
    }

    const updated = await Ticket.findOneAndUpdate(
      { _id: id, assignedTo: userId },
      {
        status: "Completed",
        resolvedAt: new Date(),
        $push: { resolutionImageUrls: req.file.path },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ data: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to resolve task" });
  }
};

// @desc    Student confirms resolution
// @route   PATCH /api/issues/confirm/:issueId
// @access  Public (reporter)
const confirmResolution = async (req, res) => {
  try {
    const { issueId } = req.params;
    const userId =
      req.auth?.userId ||
      req.user?.id ||
      req.headers["x-user-id"];

    const ticket = await Ticket.findById(issueId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.status !== "Completed") {
      return res.status(400).json({ message: "Ticket is not ready for confirmation" });
    }

    if (userId && ticket.reportedBy && ticket.reportedBy !== userId) {
      return res.status(403).json({ message: "Only the reporter can confirm" });
    }

    ticket.status = "Closed";
    await ticket.save();

    res.status(200).json({ data: ticket });
  } catch (error) {
    res.status(500).json({ message: "Failed to confirm resolution" });
  }
};

module.exports = { getAssignedTasks, updateTaskStatus, resolveTask, confirmResolution };
