const express = require("express");
const router = express.Router();
const Favourite = require("../models/Favourite");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const favourites = await Favourite.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(favourites);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.post("/", authMiddleware, async (req, res) => {
  const { title, location, price, image } = req.body;
  try {
    if (!title || !location || !price) {
      return res.status(400).json({ message: "Please fill all property fields" });
    }
    const favourite = new Favourite({
      user: req.user.id,
      property: { title, location, price, image },
    });
    await favourite.save();
    res.status(201).json({ message: "Added to favourites", favourite });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  const { title, location, price, image } = req.body;
  try {
    const favourite = await Favourite.findById(req.params.id);

    if (!favourite) {
      return res.status(404).json({ message: "Favourite not found" });
    }

 
    if (favourite.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (!title || !location || !price) {
      return res.status(400).json({ message: "Please fill all property fields" });
    }

    favourite.property = { title, location, price, image };
    await favourite.save();

    res.json({ message: "Favourite updated", favourite });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const favourite = await Favourite.findById(req.params.id);

    if (!favourite) {
      return res.status(404).json({ message: "Favourite not found" });
    }

    if (favourite.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await favourite.deleteOne();
    res.json({ message: "Removed from favourites" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;