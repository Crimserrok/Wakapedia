const fs = require('fs');
const path = require('path');

// แทน SlugFarm() ใน operation.php
exports.slugFarm = (str) => {
  let s = String(str).trim();
  s = s.replace(/[^a-zA-Z0-9ก-๙\s-]/gu, '');
  s = s.replace(/\s+/g, '-').toLowerCase();
  return s + '-' + Date.now().toString(16) + Math.random().toString(16).slice(2, 6);
};

// ลบไฟล์ในโฟลเดอร์ uploads แบบไม่ error ถ้าไม่มีไฟล์
exports.removeUpload = (dir, filename) => {
  if (!filename) return;
  const safe = path.basename(filename);
  fs.unlink(path.join(__dirname, '..', 'uploads', dir, safe), () => {});
};

exports.formatDate = (d) => {
  if (!d) return '';
  const p = n => String(n).padStart(2, '0');
  const x = new Date(d);
  return `${x.getFullYear()}-${p(x.getMonth() + 1)}-${p(x.getDate())} ${p(x.getHours())}:${p(x.getMinutes())}:${p(x.getSeconds())}`;
};
