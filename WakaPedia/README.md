# Waka Pedia (Express + Mongoose + EJS)

แปลงจากโปรเจกต์ PHP/MySQL เดิม (WMA_01_011) เป็น Node.js + Express + MongoDB (Mongoose)
หน้าเว็บเป็น HTML ที่เรนเดอร์ด้วย EJS

## วิธีรัน
1. ติดตั้ง Node.js และ MongoDB (หรือใช้ MongoDB Atlas)
2. `cp .env.example .env` แล้วแก้ `MONGODB_URI`, `SESSION_SECRET`
3. `npm install`
4. `npm run seed`   # นำข้อมูลเดิมจาก SQL (admin / normie / yee + บทความ + รูป + คอมเมนต์) เข้า MongoDB
5. `npm start`      # เปิด http://localhost:3000

บัญชีเดิมใช้รหัสผ่านเดิม (hash แบบ bcrypt จาก PHP ใช้ต่อได้)

## โครงสร้าง
- server/  : ฝั่งเซิร์ฟเวอร์ (server.js, models/, routes/, middleware/, scripts/ seed, data/ ข้อมูลเดิม, uploads/ รูปที่อัปโหลด)
- monitor/ : ฝั่งหน้าจอที่ผู้ใช้เห็น (views/ หน้า HTML แบบ EJS, css/ สไตล์เดิม)

## PHP เดิม -> เส้นทางใหม่
index.php=/  list.php=/list  ar_view.php?slug=X=/article/X  login.php=/login  signin.php=/signin
profile.php=/profile  ac_begone.php=/account/delete  upload.php=/admin/articles/new  ar_edit.php=/admin/articles/:id/edit
