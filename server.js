const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// قاعدة بيانات مؤقتة
let posts = [];
let users = [];

// --------- API المستخدمين ---------
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "⚠️ هذا الاسم مستخدم بالفعل" });
  }
  users.push({ username, password });
  res.json({ message: "✅ تم إنشاء الحساب بنجاح" });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(400).json({ message: "❌ اسم المستخدم أو كلمة المرور غير صحيحة" });
  }
  res.json({ message: "✅ تسجيل الدخول ناجح", username });
});

// --------- API المنشورات ---------
app.post("/api/post", (req, res) => {
  const { username, content } = req.body;
  posts.unshift({ username, content, date: new Date().toLocaleString() });
  res.json({ message: "✅ تم النشر" });
});

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// --------- تشغيل السيرفر ---------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 ALGNET شغال على المنفذ " + PORT));
