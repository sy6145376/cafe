const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "cafe.db"));

db.exec(`
CREATE TABLE IF NOT EXISTS menus (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    category TEXT NOT NULL
);
`);

const count = db.prepare("SELECT COUNT(*) AS count FROM menus").get();

if (count.count === 0) {
    db.prepare(`
        INSERT INTO menus (name, price, category)
        VALUES
        ('아메리카노', 4500, '커피'),
        ('카페라떼', 5000, '커피'),
        ('카푸치노', 5000, '커피'),
        ('카모마일 티', 4000, '티'),
        ('녹차', 4000, '티'),
        ('치즈케이크', 5500, '디저트')
    `).run();
}

db.close();
console.log("데이터베이스 생성 완료!");
