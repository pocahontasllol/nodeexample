const express = require("express");
const chalk = require("chalk");
const {
  addNote,
  getNotes,
  removeNotes,
  editNote,
} = require("./notes.controller");
const path = require("path");
const PORT = 3000;
const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNotes(req.params.id);
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:id/:data", async (req, res) => {
  console.log(req.params);
  await editNote({ id: req.params.id, title: req.params.data });
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});
app.listen(PORT, () => {
  console.log(chalk.green(`Server has been started on port ${PORT}`));
});
