require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const ejs = require('ejs');
const { formatDate } = require('./middleware/helpers');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/main_data';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'monitor', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 8 }
}));

app.use('/css', express.static(path.join(__dirname, '..', 'monitor', 'css')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.isAdmin = !!(req.session.user && req.session.user.type === 1);
  res.locals.nl2br = s => ejs.escapeXML(String(s ?? '')).replace(/\r?\n/g, '<br>'); // nl2br(htmlspecialchars())
  res.locals.formatDate = formatDate;
  next();
});

app.use('/', require('./routes/public'));
app.use('/', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

app.use((req, res) => res.status(404).render('error', { message: 'ไม่พบหน้าที่ต้องการ' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { message: 'เกิดข้อผิดพลาดภายในระบบ' });
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected:', MONGODB_URI);
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
