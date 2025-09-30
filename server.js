const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));

let users = [];
let posts = [];

// تسجيل مستخدم جديد
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "المستخدم موجود بالفعل" });
  }
  users.push({ username, password });
  res.json({ message: "تم التسجيل بنجاح" });
});

// تسجيل الدخول
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(400).json({ message: "بيانات الدخول غير صحيحة" });
  }
  res.json({ message: "تم تسجيل الدخول", username });
});

// جلب المنشورات
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// إضافة منشور جديد
app.post("/api/posts", (req, res) => {
  const { username, content } = req.body;
  posts.push({ username, content });
  res.json({ message: "تمت إضافة المنشور" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
