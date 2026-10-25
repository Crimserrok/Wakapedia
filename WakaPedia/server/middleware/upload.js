// แทน handleImageUpload() ใน operation.php : จำกัด 5MB, รับเฉพาะ JPG/PNG/WEBP
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const ALLOWED = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };

function makeUploader(dir) {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads', dir)),
      filename: (req, file, cb) =>
        cb(null, 'img_' + Date.now().toString(16) + crypto.randomBytes(4).toString('hex') + ALLOWED[file.mimetype])
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (!ALLOWED[file.mimetype]) {
        return cb(new Error('รองรับเฉพาะไฟล์ JPG, PNG, WEBP เท่านั้น'));
      }
      cb(null, true);
    }
  });
}

// เรียก multer แล้วแปลง error เป็นข้อความไทย แทนที่จะโยนขึ้น error handler
exports.single = (dir, field) => {
  const up = makeUploader(dir).single(field);
  return (req, res, next) => {
    up(req, res, err => {
      if (!err) return next();
      req.uploadError = err.code === 'LIMIT_FILE_SIZE' ? 'ไฟล์ใหญ่เกินไป (จำกัด 5MB)' : (err.message || 'อัปโหลดไฟล์ผิดพลาด');
      next();
    });
  };
};
