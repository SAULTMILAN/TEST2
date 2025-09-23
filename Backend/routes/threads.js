import express from "express";
import Thread from "../models/Thread.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all threads
router.get("/", async (req, res) => {
  const threads = await Thread.find().populate("author", "name").sort({ createdAt: -1 });
  res.json(threads);
});

// Create a thread
router.post("/", requireAuth, async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });

  const thread = new Thread({ title, author: req.userId });
  await thread.save();
  res.status(201).json(thread);
});

// Delete a thread
router.delete("/:id", requireAuth, async (req, res) => {
  const thread = await Thread.findById(req.params.id);
  if (!thread) return res.status(404).json({ error: "Thread not found" });

  if (thread.author.toString() !== req.userId)
    return res.status(403).json({ error: "Not authorized" });

  await thread.deleteOne();
  res.json({ message: "Thread deleted" });
});

// Like a thread
router.post("/:id/like", requireAuth, async (req, res) => {
  const thread = await Thread.findById(req.params.id);
  if (!thread) return res.status(404).json({ error: "Not found" });

  thread.dislikes = thread.dislikes.filter((u) => u.toString() !== req.userId);
  if (thread.likes.includes(req.userId)) {
    thread.likes = thread.likes.filter((u) => u.toString() !== req.userId);
  } else {
    thread.likes.push(req.userId);
  }

  await thread.save();
  res.json(thread);
});

// Dislike a thread
router.post("/:id/dislike", requireAuth, async (req, res) => {
  const thread = await Thread.findById(req.params.id);
  if (!thread) return res.status(404).json({ error: "Not found" });

  thread.likes = thread.likes.filter((u) => u.toString() !== req.userId);
  if (thread.dislikes.includes(req.userId)) {
    thread.dislikes = thread.dislikes.filter((u) => u.toString() !== req.userId);
  } else {
    thread.dislikes.push(req.userId);
  }

  await thread.save();
  res.json(thread);
});

export default router;
