// login/out, profile, delete account
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Article = require('../models/Article');
const Img = require('../models/Img');
const Comment = require('../models/Comment');
const { requireLogin, guestOnly } = require('../middleware/auth');
const { removeUpload } = require('../middleware/helpers');

const router = express.Router();

function startSession(req, user) {
  req.session.user = { id: String(user._id), mail: user.mail, name: user.name, type: user.type };
}

// ----------Login----------
router.get('/login', guestOnly, (req, res) => {
  res.render('login', { error: '', info: req.query.deleted ? 'ลบบัญชีเรียบร้อยแล้ว' : '' });
});

router.post('/login', guestOnly, async (req, res, next) => {
  try {
    const mail = String(req.body.log1 || '').trim();
    const pass = String(req.body.log2 || '');
    const user = await User.findOne({ mail });
    if (!user) return res.status(401).render('login', { error: 'ไม่พบ Email นี้ในระบบ', info: '' });
    if (!(await bcrypt.compare(pass, user.key)))
      return res.status(401).render('login', { error: 'รหัสผ่านไม่ถูกต้อง', info: '' });

    startSession(req, user);
    res.redirect('/profile');
  } catch (e) { next(e); }
});

// ----------Signin----------
router.get('/signin', guestOnly, (req, res) => res.render('signin', { error: '', form: {} }));

router.post('/signin', guestOnly, async (req, res, next) => {
  const form = { mail: String(req.body.log1 || '').trim(), name: String(req.body.log3 || '').trim() };
  try {
    const pass = String(req.body.log2 || '');
    if (!form.mail || !pass || !form.name)
      return res.status(400).render('signin', { error: 'กรุณากรอกข้อมูลให้ครบ', form });

    const user = await User.create({
      mail: form.mail,
      key: await bcrypt.hash(pass, 10),
      name: form.name,
      type: 0 //ผู้ใช้ใหม่จะมีสิทธิ์เป็นสมาชิกเท่านั้น การเพิ่ม admin ค้องตั้งค่าสิทธิ์ผ่าน db
    });
    startSession(req, user);
    res.redirect('/profile');
  } catch (e) {
    if (e.code === 11000) return res.status(400).render('signin', { error: 'Email นี้ถูกใช้แล้ว', form });
    if (e.name === 'ValidationError') return res.status(400).render('signin', { error: 'ข้อมูลไม่ถูกต้อง', form });
    next(e);
  }
});

// ---------- Logout ----------
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// ---------- Profile ----------
router.get('/profile', requireLogin, async (req, res, next) => {
  try {
    const comments = await Comment.find({ by: req.session.user.id })
      .sort({ createdAt: -1 }).populate('by', 'name').lean();
    res.render('profile', { comments });
  } catch (e) { next(e); }
});

// ---------- ลบบัญชี ----------
router.get('/account/delete', requireLogin, (req, res) => res.render('account-delete', { error: '' }));

router.post('/account/delete', requireLogin, async (req, res, next) => {
  try {
    const uid = req.session.user.id;
    const mode = req.body.delete_mode === 'delete_all' ? 'delete_all' : 'keep_content';

    if (String(req.body.confirm_text || '') !== 'ลบบัญชี')
      return res.render('account-delete', { error: 'กรุณาพิมพ์ "ลบบัญชี" ให้ถูกต้องเพื่อยืนยัน' });

    const user = await User.findById(uid);
    if (!user || !(await bcrypt.compare(String(req.body.password || ''), user.key)))
      return res.render('account-delete', { error: 'รหัสผ่านไม่ถูกต้อง' });

    if (mode === 'delete_all') {
      // ลบทุกอย่าง
      const arts = await Article.find({ writeBy: uid }, '_id');
      const artIds = arts.map(a => a._id);
      for (const i of await Img.find({ article: { $in: artIds } })) removeUpload('articles', i.src);
      for (const c of await Comment.find({ article: { $in: artIds } })) removeUpload('comments', c.imgSrc);
      await Img.deleteMany({ article: { $in: artIds } });
      await Comment.deleteMany({ article: { $in: artIds } });
      await Article.deleteMany({ writeBy: uid });

      
      for (const i of await Img.find({ by: uid })) removeUpload('articles', i.src);
      await Img.deleteMany({ by: uid });
      for (const c of await Comment.find({ by: uid })) removeUpload('comments', c.imgSrc);
      await Comment.deleteMany({ by: uid });
    } else {
      // ลบบัญชี เหลือข้อมูลอื่นไว้เป็นค่าว่าง
      await Article.updateMany({ writeBy: uid }, { $set: { writeBy: null } });
      await Img.updateMany({ by: uid }, { $set: { by: null } });
      await Comment.updateMany({ by: uid }, { $set: { by: null } });
    }
    await User.deleteOne({ _id: uid });

    req.session.destroy(() => res.redirect('/login?deleted=1'));
  } catch (e) { next(e); }
});

module.exports = router;
