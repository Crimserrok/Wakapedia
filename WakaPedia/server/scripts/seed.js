require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Article = require('../models/Article');
const Img = require('../models/Img');
const Comment = require('../models/Comment');
const data = require('../data/seed-data.json');

const toDate = s => (s ? new Date(s.replace(' ', 'T') + 'Z') : new Date());

(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wma01db');
  await Promise.all([User.deleteMany({}), Article.deleteMany({}), Img.deleteMany({}), Comment.deleteMany({})]);

  const uMap = {}, aMap = {};

  for (const u of data.user) {
    const doc = await User.create({
      mail: u.user_mail,
      key: u.user_key.replace(/^\$2y\$/, '$2a$'),
      name: u.user_name,
      type: u.user_type
    });
    uMap[u.user_id] = doc._id;
  }

  for (const a of data.article) {
    const doc = await Article.create({
      title: a.title,
      slug: a.slug,
      cont: a.cont,
      writeBy: uMap[a.write_by] || null,
      posX: Number(a.pos_x),
      posY: Number(a.pos_y)
    });
    aMap[a.art_id] = doc._id;
  }

  const commentImgs = new Set(data.comment.map(c => c.img_src).filter(Boolean));
  for (const i of data.imgin) {
    if (commentImgs.has(i.img_src)) continue;
    await Img.create({
      src: i.img_src,
      by: uMap[i.img_by] || null,
      article: aMap[i.art_id],
      order: i.img_order,
      createdAt: toDate(i.created_at)
    });
  }

  for (const c of data.comment) {
    await Comment.create({
      article: aMap[c.art_id],
      by: uMap[c.com_by] || null,
      cont: c.cont,
      imgSrc: c.img_src,
      createdAt: toDate(c.created_at)
    });
  }

  console.log('Seed เสร็จแล้ว:',
    await User.countDocuments(), 'users,',
    await Article.countDocuments(), 'articles,',
    await Img.countDocuments(), 'images,',
    await Comment.countDocuments(), 'comments');
  await mongoose.disconnect();
})().catch(e => { console.error(e); process.exit(1); });
