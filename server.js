
const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = 3000;
const db = new Database(path.join(__dirname, "cafe.db"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// 메뉴 전체 조회
app.get("/", (req, res) => {
    res.redirect("/menus");
});

app.get("/menus", (req, res) => {
    const menus = db.prepare(
        "SELECT * FROM menus ORDER BY id ASC"
    ).all();

    res.render("index", { menus, keyword: "" });
});

// 메뉴 검색
app.get("/menus/search", (req, res) => {
    const keyword = (req.query.keyword || "").trim();

    const menus = db.prepare(
        "SELECT * FROM menus WHERE name LIKE ? ORDER BY category, price"
    ).all(`%${keyword}%`);

    res.render("index", { menus, keyword });
});

// 메뉴 추가
app.post("/menus", (req, res) => {
    const name = (req.body.name || "").trim();
    const price = Number(req.body.price);
    const category = req.body.category;

    if (name === "" || !Number.isFinite(price) || price < 0) {
        return res.redirect("/menus");
    }

    db.prepare(
        "INSERT INTO menus (name, price, category) VALUES (?, ?, ?)"
    ).run(name, price, category);

    res.redirect("/menus");
});

// 메뉴 수정 화면
app.get("/menus/:id/edit", (req, res) => {
    const menu = db.prepare(
        "SELECT * FROM menus WHERE id = ?"
    ).get(req.params.id);

    if (!menu) return res.redirect("/menus");

    res.render("edit", { menu });
});

// 메뉴 수정 실행
app.post("/menus/:id/edit", (req, res) => {
    const name = (req.body.name || "").trim();
    const price = Number(req.body.price);

    if (name !== "" && Number.isFinite(price) && price >= 0) {
        db.prepare(
            "UPDATE menus SET name = ?, price = ?, category = ? WHERE id = ?"
        ).run(name, price, req.body.category, req.params.id);
    }

    res.redirect("/menus");
});

// 메뉴 삭제
app.post("/menus/:id/delete", (req, res) => {
    db.prepare(
        "DELETE FROM menus WHERE id = ?"
    ).run(req.params.id);

    res.redirect("/menus");
});

app.listen(PORT, () => {
    console.log(`카페 메뉴 관리 서버 실행 중: http://localhost:${PORT}/menus`);
});

