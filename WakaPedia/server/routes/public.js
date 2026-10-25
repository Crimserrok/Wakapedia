//
const express = require('express');
const mongoose = require('mongoose');
const Article = require('../models/Article');
const Img = require('../models/Img');
const Comment = require('../models/Comment');
const upload = require('../middleware/upload');
const { removeUpload } = require('../middleware/helpers');
const { requireLogin } = require('../middleware/auth');

const router = express.Router();
const escapeRegex = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// ----------หน้าแรก/ค้นหา----------
router.get('/', async (req, res, next) => {
  try {
    const search = String(req.query.q || '').trim();
    const filter = {};
    if (search) {
      const re = new RegExp(escapeRegex(search), 'i');
      filter.$or = [{ title: re }, { cont: re }];
    }
    const articles = await Article.find(filter).sort({ _id: -1 }).limit(12).lean();

    // รูปปกของแต่ละบทความ = รูปแรกในแกลเลอรี
    const imgs = await Img.find({ article: { $in: articles.map(a => a._id) } })
      .sort({ order: 1, _id: 1 }).lean();
    const thumbs = {};
    for (const i of imgs) if (!thumbs[i.article]) thumbs[i.article] = i.src;

    articles.forEach(a => {
      const plain = a.cont.replace(/<[^>]*>/g, '');
      a.excerpt = [...plain].slice(0, 100).join('') + ([...a.cont].length > 100 ? '...' : '');
      a.thumb = thumbs[a._id] || null;
    });

    res.render('index', { articles, search });
  } catch (e) { next(e); }
});

// ----------รายการสถานที่----------
router.get('/list', async (req, res, next) => {
  try {
    const articles = await Article.find().sort({ _id: -1 }).populate('writeBy', 'name').lean();
    res.render('list', { articles });
  } catch (e) { next(e); }
});

// ----------อ่านบทความ----------
async function loadArticlePage(slug) {
  const article = await Article.findOne({ slug }).populate('writeBy', 'name').lean();
  if (!article) return null;
  const gallery = await Img.find({ article: article._id }).sort({ order: 1, _id: 1 }).lean();
  const comments = await Comment.find({ article: article._id })
    .sort({ createdAt: -1 }).populate('by', 'name').lean();
  return { article, gallery, comments };
}

router.get('/article/:slug', async (req, res, next) => {
  try {
    const data = await loadArticlePage(req.params.slug);
    if (!data) return res.status(404).render('error', { message: 'ไม่พบบทความ' });
    res.render('article', { ...data, commentError: '' });
  } catch (e) { next(e); }
});

// ----------เพิ่มคอมเมนต์----------
router.post('/article/:slug/comment', upload.single('comments', 'comment_img'), async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const data = await loadArticlePage(slug);
    if (!data) return res.status(404).render('error', { message: 'ไม่พบบทความ' });

    const fail = msg => {
      if (req.file) removeUpload('comments', req.file.filename);
      return res.status(400).render('article', { ...data, commentError: msg });
    };

    if (!req.session.user) return fail('กรุณาเข้าสู่ระบบก่อนคอมเมนต์');
    if (req.uploadError) return fail(req.uploadError);
    const cont = String(req.body.cont || '').trim();
    if (!cont) return fail('กรุณากรอกข้อความคอมเมนต์');

    await Comment.create({
      article: data.article._id,
      by: req.session.user.id,
      cont,
      imgSrc: req.file ? req.file.filename : null
    });
    res.redirect(`/article/${encodeURIComponent(slug)}#comments`);
  } catch (e) { next(e); }
});

// ----------ลบคอมเมนต์(เจ้าของ หรือ admin)----------
router.post('/comment/:id/delete', requireLogin, async (req, res, next) => {
  try {
    const back = req.get('Referer') || '/';
    if (!mongoose.isValidObjectId(req.params.id)) return res.redirect(back);

    const com = await Comment.findById(req.params.id);
    const me = req.session.user;
    if (com && (me.type === 1 || String(com.by) === me.id)) {
      removeUpload('comments', com.imgSrc);
      await com.deleteOne();
    }
    res.redirect(back);
  } catch (e) { next(e); }
});

module.exports = router;
