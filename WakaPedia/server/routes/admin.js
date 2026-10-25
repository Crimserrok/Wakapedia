// เฉพาะ admin: upload.php, ar_edit.php, ar_delete.php
const express = require('express');
const mongoose = require('mongoose');
const Article = require('../models/Article');
const Img = require('../models/Img');
const Comment = require('../models/Comment');
const upload = require('../middleware/upload');
const { requireAdmin } = require('../middleware/auth');
const { slugFarm, removeUpload } = require('../middleware/helpers');

const router = express.Router();
router.use(requireAdmin);

const isNum = v => v !== '' && !isNaN(Number(v));

// ----------เพิ่มบทความ----------
router.get('/articles/new', (req, res) => res.render('admin/article-new', { error: '', form: {} }));

router.post('/articles/new', async (req, res, next) => {
  const form = {
    title: String(req.body.title || '').trim(),
    cont: String(req.body.cont || ''),
    pos_x: String(req.body.pos_x || '').trim(),
    pos_y: String(req.body.pos_y || '').trim()
  };
  try {
    if (!form.title || !form.cont.trim() || !form.pos_x || !form.pos_y)
      return res.status(400).render('admin/article-new', { error: 'กรุณากรอกข้อมูลให้ครบ', form });
    if (!isNum(form.pos_x) || !isNum(form.pos_y))
      return res.status(400).render('admin/article-new', { error: 'พิกัดต้องเป็นตัวเลขเท่านั้น', form });

    await Article.create({
      title: form.title,
      slug: slugFarm(form.title),
      cont: form.cont,
      writeBy: req.session.user.id,
      posX: Number(form.pos_x),
      posY: Number(form.pos_y)
    });
    res.redirect('/list');
  } catch (e) { next(e); }
});

// ----------แก้ไขบทความ----------
async function loadEdit(id) {
  if (!mongoose.isValidObjectId(id)) return null;
  const article = await Article.findById(id).lean();
  if (!article) return null;
  const gallery = await Img.find({ article: id }).sort({ order: 1, _id: 1 }).lean();
  return { article, gallery };
}

router.get('/articles/:id/edit', async (req, res, next) => {
  try {
    const data = await loadEdit(req.params.id);
    if (!data) return res.status(404).render('error', { message: 'ไม่พบข้อมูลที่ต้องการแก้ไข' });
    res.render('admin/article-edit', { ...data, error: '' });
  } catch (e) { next(e); }
});

router.post('/articles/:id/edit', async (req, res, next) => {
  try {
    const data = await loadEdit(req.params.id);
    if (!data) return res.status(404).render('error', { message: 'ไม่พบข้อมูลที่ต้องการแก้ไข' });

    const title = String(req.body.title || '').trim();
    const cont = String(req.body.cont || '');
    const pos_x = String(req.body.pos_x || '').trim();
    const pos_y = String(req.body.pos_y || '').trim();

    let error = '';
    if (!title || !cont.trim() || !pos_x || !pos_y) error = 'กรุณากรอกข้อมูลให้ครบ';
    else if (!isNum(pos_x) || !isNum(pos_y)) error = 'พิกัดต้องเป็นตัวเลขเท่านั้น';

    if (error) {
      // แสดงค่าที่ผู้ใช้เพิ่งกรอกกลับไปในฟอร์ม
      Object.assign(data.article, { title, cont, posX: pos_x, posY: pos_y });
      return res.status(400).render('admin/article-edit', { ...data, error });
    }
    await Article.updateOne({ _id: req.params.id }, { title, cont, posX: Number(pos_x), posY: Number(pos_y) });
    res.redirect('/list');
  } catch (e) { next(e); }
});

// ----------เพิ่มรูปในแกลเลอรี----------
router.post('/articles/:id/images', upload.single('articles', 'gallery_img'), async (req, res, next) => {
  try {
    const data = await loadEdit(req.params.id);
    if (!data) {
      if (req.file) removeUpload('articles', req.file.filename);
      return res.status(404).render('error', { message: 'ไม่พบข้อมูล' });
    }
    if (req.uploadError || !req.file)
      return res.status(400).render('admin/article-edit', { ...data, error: req.uploadError || 'กรุณาเลือกไฟล์รูปภาพ' });

    await Img.create({ src: req.file.filename, by: req.session.user.id, article: req.params.id });
    res.redirect(`/admin/articles/${req.params.id}/edit`);
  } catch (e) { next(e); }
});

// ----------ลบรูปในแกลเลอรี----------
router.post('/articles/:id/images/:imgId/delete', async (req, res, next) => {
  try {
    const { id, imgId } = req.params;
    if (mongoose.isValidObjectId(imgId) && mongoose.isValidObjectId(id)) {
      const img = await Img.findOne({ _id: imgId, article: id });
      if (img) {
        removeUpload('articles', img.src);
        await img.deleteOne();
      }
    }
    res.redirect(`/admin/articles/${id}/edit`);
  } catch (e) { next(e); }
});

// ----------ลบบทความ----------
router.post('/articles/:id/delete', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (mongoose.isValidObjectId(id)) {
      for (const i of await Img.find({ article: id })) removeUpload('articles', i.src);
      for (const c of await Comment.find({ article: id })) removeUpload('comments', c.imgSrc);
      await Img.deleteMany({ article: id });
      await Comment.deleteMany({ article: id });
      await Article.deleteOne({ _id: id });
    }
    res.redirect('/list');
  } catch (e) { next(e); }
});

module.exports = router;
