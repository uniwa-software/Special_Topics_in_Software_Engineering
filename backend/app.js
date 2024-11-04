require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const Users = require("./models/users");
const Appointments = require("./models/appointments");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./middleware/authenticateToken");

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Η σύνδεση με τη βάση δεδομένων ήταν επιτυχής.");
  })
  .catch((err) => {
    console.error("Αποτυχία σύνδεσης με τη βάση δεδομένων:", err);
  });

app.get("/", (req, res) => {
  res.send("Backend API is running!");
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointments.findAll();
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { username, password, email, phone , address, role , created_at } = req.body;

    const existingUser = await Users.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      username,
      password: hashedPassword,
      email,
      phone,
      address,
      role,
      created_at
    });

    

    const token = jwt.sign({
      username:user.username,
      role: user.role
      },
      process.env.JWT_SECRET,
      {expiresIn : process.env.JWT_EXPIRES_IN || '1h'}
    );

    // Return user info and token
    res.status(201).json({ 
      message: "User registered successfully",
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      },
      token 
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { 
        username: user.username, 
        role: user.role 
      },
       process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

     // Return user info and token
     res.status(201).json({ 
      message: "User registered successfully",
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      },
      token 
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/verify-token", authenticateToken, (req, res) => {
  res.json({ 
      valid: true, 
      user: req.user 
  });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
