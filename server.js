const express = require("express");
const { static } = express;
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/dist", static(path.join(__dirname, "dist")));

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/api/jobs", async (req, res, next) => {
  try {
    res.send(await Job.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/jobs", async (req, res, next) => {
  try {
    console.log(`this is the req.body.name:${req.body.name}`);
    res.send(await Job.create({ name: req.body.name }));
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/jobs/:id", async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);
    await job.update(req.body);
    res.send(job);
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
const { STRING, INTEGER, BOOLEAN } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/party_builder_db"
);

const Job = conn.define("job", {
  name: { type: STRING, allowNull: false, validate: { notEmpty: true } },
  selected: { type: BOOLEAN, allowNull: false, defaultValue: false },
  str: { type: INTEGER },
  agl: { type: INTEGER },
  int: { type: INTEGER },
  sta: { type: INTEGER },
  lck: { type: INTEGER },
});
const syncAndSeed = async () => {
  await conn.sync({ force: true });
  await Promise.all([
    Job.create({ name: "Warrior", str: 10, agl: 5, int: 3, sta: 7, lck: 5 }),
    Job.create({ name: "Thief", str: 5, agl: 9, int: 5, sta: 4, lck: 8 }),
    Job.create({ name: "Monk", str: 7, agl: 7, int: 4, sta: 10, lck: 5 }),
    Job.create({ name: "Red Mage", str: 6, agl: 6, int: 7, sta: 5, lck: 6 }),
    //Okay, Prettier.
    Job.create({
      name: "White Mage",
      selected: true,
      str: 3,
      agl: 4,
      int: 9,
      sta: 2,
      lck: 5,
    }),
    Job.create({
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
