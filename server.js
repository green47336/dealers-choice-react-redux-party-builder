const express = require("express");
const { static } = express;
const path = require("path");

const app = express();

app.use("/dist", static(path.join(__dirname, "dist")));

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/api/classes", async (req, res, next) => {
  try {
    res.send(await Class.findAll());
  } catch (ex) {
    next(ex);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/party_builder_db"
);

const Class = conn.define("class", {
  name: STRING,
  str: INTEGER,
  agl: INTEGER,
  int: INTEGER,
  sta: INTEGER,
  lck: INTEGER,
});
const syncAndSeed = async () => {
  await conn.sync({ force: true });
  await Promise.all([
    Class.create({ name: "Warrior", str: 10, agl: 5, int: 3, sta: 7, lck: 5 }),
    Class.create({ name: "Thief", str: 5, agl: 9, int: 5, sta: 4, lck: 8 }),
    Class.create({ name: "Monk", str: 7, agl: 7, int: 4, sta: 10, lck: 5 }),
    Class.create({ name: "Red Mage", str: 6, agl: 6, int: 7, sta: 5, lck: 6 }),
    //Okay, Prettier.
    Class.create({
      name: "White Mage",
      str: 3,
      agl: 4,
      int: 9,
      sta: 2,
      lck: 5,
    }),
    Class.create({
      name: "Black Mage",
      str: 3,
      agl: 3,
      int: 10,
      sta: 2,
      lck: 5,
    }),
  ]);
};

init();
