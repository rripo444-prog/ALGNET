# ALGNETimport express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// بيانات مؤقتة (مصفوفات بدل قاعدة بيانات)
let users = [];
let posts = [];

// تسجيل مستخدم جديد
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.json({ message: "⚠️ اسم المستخدم موجود بالفعل" });
  }
  users.push({ username, email, password });
  res.json({ message: "✅ تم التسجيل بنجاح" });
});

// إضافة منشور
app.post("/api/post", (req, res) => {
  const { username, content } = req.body;
  const newPost = { username, content, date: new Date().toLocaleString() };
  posts.unshift(newPost);
  res.json({ message: "✅ تم إضافة المنشور", post: newPost });
});

// جلب المنشورات
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 ALGNET server running on port ${PORT}`));
