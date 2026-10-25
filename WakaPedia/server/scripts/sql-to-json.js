// แปลงไฟล์ dump ของ MySQL (data/wma01db.sql) -> data/seed-data.json
// ใช้ครั้งเดียวตอนเตรียมข้อมูล:  node scripts/sql-to-json.js
const fs = require('fs');
const path = require('path');

const sql = fs.readFileSync(path.join(__dirname, '../data/wma01db.sql'), 'utf8');

function parseValues(text, i) {
  const rows = [];
  while (i < text.length) {
    while (/[\s,]/.test(text[i])) i++;
    if (text[i] === ';') break;
    if (text[i] !== '(') throw new Error('unexpected char at ' + i + ': ' + text[i]);
    i++;
    const row = [];
    while (true) {
      while (/\s/.test(text[i])) i++;
      let val;
      if (text[i] === "'") {
        i++;
        let s = '';
        while (true) {
          const c = text[i];
          if (c === '\\') {
            const n = text[i + 1];
            const map = { n: '\n', r: '\r', t: '\t', '0': '\0', b: '\b', Z: '\x1a' };
            s += n in map ? map[n] : n;
            i += 2;
          } else if (c === "'" && text[i + 1] === "'") {
            s += "'"; i += 2;
          } else if (c === "'") { i++; break; }
          else { s += c; i++; }
        }
        val = s;
      } else {
        let j = i;
        while (!/[,)]/.test(text[j])) j++;
        const raw = text.slice(i, j).trim();
        val = raw.toUpperCase() === 'NULL' ? null : Number(raw);
        i = j;
      }
      row.push(val);
      while (/\s/.test(text[i])) i++;
      if (text[i] === ',') { i++; continue; }
      if (text[i] === ')') { i++; break; }
    }
    rows.push(row);
  }
  return rows;
}

const out = {};
const re = /INSERT INTO `(\w+)` \(([^)]*)\) VALUES/g;
let m;
while ((m = re.exec(sql))) {
  const table = m[1];
  const cols = m[2].split(',').map(s => s.trim().replace(/`/g, ''));
  const rows = parseValues(sql, re.lastIndex);
  out[table] = rows.map(r => Object.fromEntries(cols.map((c, k) => [c, r[k]])));
}
fs.writeFileSync(path.join(__dirname, '../data/seed-data.json'), JSON.stringify(out, null, 2));
for (const [t, r] of Object.entries(out)) console.log(t, r.length, 'rows');
