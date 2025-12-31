const express = require('express');
const app = express();
const path = require('path');

// 设置模板引擎为EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 配置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 解析POST请求体
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 模拟数据 - 无需数据库
const posts = [
  { id: 1, title: '欢迎来到我的网站', content: '这是一个动态网站，无需数据库即可运行。', author: '管理员', date: new Date().toLocaleDateString() },
  { id: 2, title: 'Express框架介绍', content: 'Express是一个基于Node.js的Web应用框架，用于构建动态网站和API。', author: '管理员', date: new Date().toLocaleDateString() },
  { id: 3, title: 'EJS模板引擎', content: 'EJS是一个简单的模板语言，允许你在HTML中嵌入JavaScript代码。', author: '管理员', date: new Date().toLocaleDateString() }
];

// 首页路由
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// 文章详情页路由
app.get('/post/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.render('post', { post });
  } else {
    res.status(404).render('error', { message: '文章未找到' });
  }
});

// 联系我们页面
app.get('/contact', (req, res) => {
  res.render('contact');
});

// 处理联系表单提交
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  // 这里可以添加表单验证和处理逻辑
  console.log('收到联系信息：', { name, email, message });
  res.render('contact', { success: true });
});

// 关于页面
app.get('/about', (req, res) => {
  res.render('about');
});

// 404页面
app.use((req, res) => {
  res.status(404).render('error', { message: '页面未找到' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

// 导出应用，供Vercel使用
module.exports = app;
