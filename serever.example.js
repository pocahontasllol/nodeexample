// const yargs = require("yargs");
// const pkg = require("./package.json");
// const { addNote, printNotes,removeNotes } = require("./notes.controller");

// yargs.version(pkg.version);

// yargs.command({
//   command: "add",
//   describe: "Add new note to list",
//   builder: {
//     title: {
//       type: "string",
//       describe: "Note title",
//       demandOption: true,
//     }
//   },
//   handler({ title }) {
//     addNote(title);
//   }
// });

// yargs.command({
//   command: "list",
//   describe: "print all list",
//   async handler() {
//     printNotes()
//   },
// });

// yargs.command({
//   command: "remove",
//   describe: "remove note by id",
//   async handler({id}) {
//     removeNotes(id)
//   },
// });

// yargs.parse();



const server = http.createServer(async (req, res) => {
  if (req.method === "GET") {
    const content = await fs.readFile(path.join(basePath, "index.html"));
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(content);
  } else if (req.method === "POST") {
    const body = [];

    res.writeHead(200,{
      "Content-Type":"text/plain:charset=utf-8"
    })
    req.on("data", (data) => {
      body.push(Buffer.from(data));
    });
    req.on("end", () => {
      const title = body.toString().split("=")[1].replace("+", " ");
      addNote(title);

      res.end(`Title = ${title}`);
    });
  }
});