// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// mongoose.connect('mongodb://localhost:27017/plantations');

// const Plantation = mongoose.model('Plantation', {
//   name: String,
//   description: String,
//   photo: String,
//   latitude: Number,
//   longitude: Number,
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage: storage });

// app.get('/plantations', async (req, res) => {
//   const plantations = await Plantation.find();
//   res.json(plantations);
// });

// app.post('/plantations', upload.single('photo'), async (req, res) => {
//   const { name, description, latitude, longitude } = req.body;
//   const photo = req.file ? req.file.path : null;
//   const plantation = new Plantation({ name, description, photo, latitude, longitude });
//   await plantation.save();
//   res.json(plantation);
// });

// app.listen(3000, () => console.log('Backend listening on port 3000'));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://localhost:27017/branches");

const Branch = mongoose.model("Branch", {
  name: String,
  description: String,
  photo: String,
  latitude: Number,
  longitude: Number,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get("/branches", async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar filiais" });
  }
});

app.post("/branches", upload.single("photo"), async (req, res) => {
  try {
    const { name, description, latitude, longitude } = req.body;
    const photo = req.file ? req.file.path : null;
    const branch = new Branch({
      name,
      description,
      photo,
      latitude,
      longitude,
    });
    await branch.save();
    res.json(branch);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar filial" });
  }
});

app.listen(3000, () => console.log("Backend ouvindo na porta 3000"));
