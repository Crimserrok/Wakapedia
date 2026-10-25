// ตรวจสิทธิ์ (แทน if (!isset($_SESSION[...])) ใน PHP)
exports.requireLogin = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login');
  next();
};

exports.requireAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.type !== 1) return res.redirect('/');
  next();
};

exports.guestOnly = (req, res, next) => {
  if (req.session.user) return res.redirect('/');
  next();
};
