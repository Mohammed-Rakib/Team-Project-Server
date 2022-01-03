const express = require("express");
const router = express.Router();
const { Comment } = require("../models/comments");

router.get("/", async (req, res) => {
  try {
    const result = await Comment.find({});
    res.json({
      count: result.length,
      data: result,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// add a comment from user and store it into database
router.post("/", async (req, res) => {
  try {
    const comment = new Comment(req.body);
    const result = await comment.save();
    res.json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// delete comments
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Comment.findByIdAndDelete(id);
    res.json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
