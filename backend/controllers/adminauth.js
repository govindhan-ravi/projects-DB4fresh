// import jwt from "jsonwebtoken";
 
// export const loginAdmin = async (req, res) => {
//   const token = jwt.sign(
//     {
//       id: "admin123",
//       role: "admin",
//     },
//     process.env.ADMIN_SECRET,
//     { expiresIn: "1d" }
//   );
 
//   res.json({ success: true, token });
// };
 import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    const admin = rows[0];

    // If passwords are stored as bcrypt hashes
    const isMatch = password === admin.password;

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin",
      },
      process.env.ADMIN_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error("Admin Login Error:", err);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [existing] = await db.query(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    await db.query(
      "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create admin",
    });
  }
};