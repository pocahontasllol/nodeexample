const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgCyan("was added"));
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.title + " " + note.id));
  });
}

// async function updateNote(noteData) {
//   const notes = await getNotes();
//   const index = notes.findIndex((note) => note.id === noteData.id);
//   console.log(index);
//   if (index >= 0) {
//     notes[index] = { ...notes[index], ...noteData };
//     await fs.writeFile(notesPath, JSON.stringify(notes));
//     console.log(
//       chalk.bgGreen(`Note with od="${noteData.id}" has been updated!`)
//     );
//   }
// }
async function editNote(noteData) {
  const notes = await getNotes();
  const noteIndex = notes.findIndex((note) => note.id === noteData.id);
  console.log(noteData);
  console.log(noteIndex);
  if (noteIndex >= 0) {
    notes[noteIndex] = { ...notes[noteIndex], ...noteData };
    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(
      chalk.bgGreen(`Note with id="${noteData.id}" has been updated!`)
    );
  }
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}
async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function removeNotes(id) {
  const notes = await getNotes();
  const newNotes = notes.filter((note) => note.id !== id);
  await saveNotes(newNotes);
  console.log(chalk.red(`Note with id=${id} has been removed`));
}

module.exports = {
  addNote,
  removeNotes,
  getNotes,
  editNote,
};
