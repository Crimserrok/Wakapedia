# Waka Pedia — ระบบฐานข้อมูลสถานที่ท่องเที่ยวทางธรรมชาติ

เว็บสารานุกรมสถานที่ท่องเที่ยวธรรมชาติ รวมข้อมูลสถานที่ รูปภาพ พิกัดบนแผนที่ และความเห็นของผู้เข้าชมไว้ในที่เดียว
พัฒนาด้วย Node.js, Express.js และ MongoDB (Mongoose) โดย port มาจากโปรเจกต์ PHP/MySQL เดิม

## แนวคิดและปัญหาที่ระบบแก้

**ปัญหาที่ระบบตอบสนอง**
- ข้อมูลสถานที่ท่องเที่ยวธรรมชาติกระจายอยู่ตามหลายเว็บ ต้องค้นหาและเปิดหลายแหล่งกว่าจะได้ภาพรวมของสถานที่เดียว
- ผู้ที่สนใจไม่รู้ว่าสถานที่อยู่ตรงไหนและหน้าตาเป็นอย่างไร ระบบจึงแสดงเนื้อหา แกลเลอรีรูป และแผนที่ในหน้าเดียว
- ข้อมูลที่ไม่มีผู้ดูแลมักไม่น่าเชื่อถือ ระบบจึงให้เฉพาะผู้ดูแลเป็นผู้เพิ่ม แก้ไข และลบบทความ ส่วนผู้ใช้ทั่วไปร่วมแสดงความเห็นได้

**ผู้ใช้ที่ระบบตอบสนอง**
- ผู้ที่ต้องการหาข้อมูลและแรงบันดาลใจก่อนไปเที่ยวธรรมชาติ
- ผู้ที่อยากแบ่งปันประสบการณ์หรือรูปภาพจากสถานที่นั้น
- ผู้ดูแลระบบ

## ประเภทผู้ใช้งาน

| ประเภท | สถานะ |
|---|---|
| ผู้เยี่ยมชม (Guest) | ยังไม่ได้เข้าสู่ระบบ |
| สมาชิก (User) | `user type = 0` |
| ผู้ดูแลระบบ (Admin) | `user type = 1` |

## ระบบทำอะไรได้บ้าง

| ฟังก์ชัน | การเข้าถึง |
|---|---|
| แสดงหน้าแรกเป็นการ์ดสถานที่ล่าสุด พร้อมรูปปกและเนื้อหาย่อ | All |
| ค้นหาสถานที่จากคำในชื่อเรื่องหรือเนื้อหา | All |
| แสดงรายการสถานที่ทั้งหมดพร้อมชื่อผู้จัดทำ | All |
| แสดงบทความ แกลเลอรีรูปแบบสไลด์ และแผนที่ตามพิกัดละติจูด/ลองจิจูด | All |
| สมัครสมาชิก | Guest |
| เข้าสู่ระบบและออกจากระบบ | All |
| แสดงความเห็นพร้อมแนบรูปภาพได้ | User, Admin |
| ลบความเห็นของตนเอง (Admin ลบของทุกคนได้) | User, Admin |
| แสดงโปรไฟล์และความเห็นทั้งหมดของตน | User, Admin |
| ลบบัญชี โดยต้องยืนยันรหัสผ่านและพิมพ์ข้อความยืนยัน เลือกได้ว่าจะเก็บหรือลบเนื้อหาของตนด้วย | User, Admin |
| เพิ่มบทความใหม่ (ชื่อ เนื้อหา พิกัด รูปภาพ) | Admin |
| แก้ไขบทความ | Admin |
| ลบบทความ | Admin |
| เพิ่มและลบรูปในแกลเลอรีของบทความ | Admin |

## เทคโนโลยีที่ใช้

| ส่วน | เทคโนโลยี |
|---|---|
| Frontend | HTML5, CSS3, JavaScript, EJS, Bootstrap, Leaflet (แผนที่) |
| Backend | Node.js, Express.js |
| ฐานข้อมูล | MongoDB + Mongoose |
| ผู้ใช้และสถานะ | express-session (cookie), bcryptjs |
| อัปโหลดไฟล์ | multer (JPG/PNG/WEBP, ไม่เกิน 5MB ต่อรูป) |

## การติดตั้งระบบ

### สิ่งที่ต้องมี
- Node.js เวอร์ชัน 18 ขึ้นไป
- MongoDB (ติดตั้งในเครื่อง หรือใช้ MongoDB Atlas) และ MongoDB Compass สำหรับดูข้อมูล

### ขั้นตอน

1. ดาวน์โหลดไฟล์โปรเจกต์จาก
   https://drive.google.com/drive/folders/1lKcd0QupI_MbC4SkMcEFBfjayF8bALcl?usp=sharing
   แล้วแตกไฟล์

2. เปิด cmd ในโฟลเดอร์โปรเจกต์ แล้วติดตั้งแพ็กเกจ
   ```bash
   npm install
   ```

3. ตั้งค่าไฟล์ `.env`
   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/wakapedia
   SESSION_SECRET=ข้อความยาวๆ เพื่อเป็นนามสกุลให้ session
   ```

4. นำข้อมูลเข้าฐานข้อมูล เลือกวิธีใดวิธีหนึ่ง
   - **วิธีที่ 1: Import ผ่าน MongoDB Compass**
     นำเข้าไฟล์ JSON ในโฟลเดอร์ `WakaPedia\server\data` เข้าฐานข้อมูล `wakapedia` ให้ตรงกับชื่อ collection:

     | ไฟล์ | Collection |
     |---|---|
     | `wakapedia.articles.json` | `articles` |
     | `wakapedia.comments.json` | `comments` |
     | `wakapedia.imgs.json` | `imgs` |
     | `wakapedia.users.json` | `users` |

     (เปิด collection แล้วกด **Add Data → Import JSON or CSV file**)
   - **วิธีที่ 2: ใช้คำสั่ง seed**
     ```bash
     npm run seed
     ```
     เป็นการแปลงชุดข้อมูลเดิมเข้าสู่ Mongoose
     *หมายเหตุ: ไฟล์บางส่วนในระบบมีการเปลี่ยนแปลง การดึงข้อมูลผ่าน seed อาจทำให้ภาพแสดงผลผิดพลาดบางส่วน*
     *คำสั่งนี้จะลบข้อมูลเดิมใน collection `users`, `articles`, `imgs`, `comments` ก่อนนำเข้า*

5. เริ่มระบบ แล้วเปิด http://localhost:3000
   ```bash
   npm start
   ```

## User ตัวอย่าง

| User | Password |
|---|---|
| admin | pass |
| testUser01 | pass |
| testUser02 | pass |

> ถ้าใช้ข้อมูลจากการ `npm run seed` ชุดเดิม รหัสผ่านของบัญชีตัวอย่างอาจเป็นค่าเดิมจากโปรเจกต์ PHP
> ในกรณีนั้นให้สมัครบัญชีใหม่ที่หน้า `/signin` หรือใช้ข้อมูลที่ import จากไฟล์ JSON

## โครงสร้างโปรเจกต์

```
server/    ฝั่งเซิร์ฟเวอร์
  server.js        เริ่มระบบ, session, เชื่อม MongoDB
  models/          User, Article, Img, Comment (Mongoose)
  routes/          public.js, auth.js, admin.js
  middleware/      auth.js (สิทธิ์), upload.js, helpers.js
  scripts/         seed.js, sql-to-json.js
  data/            ข้อมูลตัวอย่าง
  uploads/         รูปที่อัปโหลด (articles/, comments/)
monitor/   ฝั่งหน้าจอ
  views/           หน้า HTML (EJS) และ partials
  css/             สไตล์ชีต
```

## เส้นทาง (Routing)

| Method | Path | หน้าที่ | สิทธิ์ |
|---|---|---|---|
| GET | `/`, `/?q=คำค้น` | หน้าแรก + ค้นหา | All |
| GET | `/list` | รายการสถานที่ | All |
| GET | `/article/:slug` | อ่านบทความ | All |
| POST | `/article/:slug/comment` | เพิ่มความเห็น | User, Admin |
| POST | `/comment/:id/delete` | ลบความเห็น | เจ้าของ, Admin |
| GET, POST | `/login`, `/signin` | เข้าสู่ระบบ / สมัครสมาชิก | Guest |
| GET | `/logout` | ออกจากระบบ | All |
| GET | `/profile` | โปรไฟล์ | User, Admin |
| GET, POST | `/account/delete` | ลบบัญชี | User, Admin |
| GET, POST | `/admin/articles/new` | เพิ่มบทความ | Admin |
| GET, POST | `/admin/articles/:id/edit` | แก้ไขบทความ | Admin |
| POST | `/admin/articles/:id/images` | เพิ่มรูปแกลเลอรี | Admin |
| POST | `/admin/articles/:id/images/:imgId/delete` | ลบรูปแกลเลอรี | Admin |
| POST | `/admin/articles/:id/delete` | ลบบทความ | Admin |

## Session และสถานะผู้ใช้

เมื่อเข้าสู่ระบบ เซิร์ฟเวอร์เก็บ `{ id, mail, name, type }` ไว้ใน session และส่ง cookie `connect.sid`
(httpOnly, อายุ 8 ชั่วโมง) ให้เบราว์เซอร์ เมนูและปุ่มต่าง ๆ เปลี่ยนตามสถานะ Guest / User / Admin
ส่วนการตรวจสิทธิ์ทำที่เซิร์ฟเวอร์ผ่าน middleware `requireLogin`, `requireAdmin` และ `guestOnly`

## ข้อจำกัด

- session เก็บในหน่วยความจำ เมื่อรีสตาร์ทเซิร์ฟเวอร์ต้องเข้าสู่ระบบใหม่
- ยังไม่มีระบบลืมรหัสผ่าน ยืนยันอีเมล และ CSRF token
- ไฟล์รูปอยู่ในโฟลเดอร์ `server/uploads` ถ้าย้ายเครื่องต้องคัดลอกโฟลเดอร์นี้ไปด้วย
