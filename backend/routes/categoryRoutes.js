import express from "express";
import db from "../config/db.js";

const router = express.Router();

/* ==============================
   USER APP - ACTIVE CATEGORIES ONLY
============================== */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, name, image
      FROM categories
      WHERE status='ACTIVE'
      ORDER BY name
    `);

    res.json(rows);
  } catch (err) {
    console.error("GET ACTIVE CATEGORIES ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ==============================
   ADMIN - ALL CATEGORIES
============================== */
router.get("/admin/all", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, name, image, status
      FROM categories
      ORDER BY name
    `);

    res.json(rows);
  } catch (err) {
    console.error("GET ADMIN CATEGORIES ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ==============================
   HOME PAGE CATEGORY TREE
   ONLY ACTIVE CATEGORIES
============================== */
router.get("/with-subcategories", async (req, res) => {
  try {
    const [categories] = await db.query(`
      SELECT id, name
      FROM categories
      WHERE status='ACTIVE'
      ORDER BY name
    `);

    const [subcategories] = await db.query(`
      SELECT id, name, image, category_id
      FROM subcategories
      WHERE status='ACTIVE'
      ORDER BY name
    `);

    const data = categories.map((cat) => ({
      ...cat,
      subcategories: subcategories.filter(
        (sub) => sub.category_id === cat.id
      ),
    }));

    res.json(data);
  } catch (err) {
    console.error("CATEGORY TREE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});
/* ==============================
   ADD CATEGORY
============================== */
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    await db.query(
      "INSERT INTO categories(name, status) VALUES (?, ?)",
      [name, "ACTIVE"]
    );

    res.json({
      success: true,
      message: "Category added successfully",
    });
  } catch (err) {
    console.error("ADD CATEGORY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ==============================
   UPDATE CATEGORY
============================== */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    await db.query(
      `
      UPDATE categories
      SET name=?, status=?
      WHERE id=?
      `,
      [name, status, id]
    );

    res.json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (err) {
    console.error("UPDATE CATEGORY ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ==============================
   DELETE CATEGORY
============================== */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM categories WHERE id=?",
      [id]
    );

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.error("DELETE CATEGORY ERROR:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;