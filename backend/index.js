require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");

async function initDatabase() {
  const { sequelize, Task } = require("./models/index.js");

  // try {
  //   let files = fs.readdirSync(path.join(__dirname, "models"));
  //   let alter = false;
  //   let lastModificationModels;
  //   try {
  //     lastModificationModels = JSON.parse(
  //       fs.readFileSync(path.join(__dirname, "lastModificationModels.json"))
  //     );
  //   } catch (err) {
  //     lastModificationModels = {};
  //   }
  //   for (let file of files) {
  //     if (file.endsWith(".model.js")) {
  //       let stats = fs.statSync(path.join(__dirname, "models", file));
  //       if (
  //         !lastModificationModels[file] ||
  //         (lastModificationModels[file] &&
  //           lastModificationModels[file] < stats.mtimeMs)
  //       ) {
  //         alter = true;
  //         lastModificationModels[file] = stats.mtimeMs;
  //       }
  //     }
  //   }
  //   fs.writeFileSync(
  //     path.join(__dirname, "lastModificationModels.json"),
  //     JSON.stringify(lastModificationModels, null, 4)
  //   );

  //   await sequelize.sync({ alter });
  //   console.log("🚀 ~ initDatabase ~ alter:", alter);
  // } catch (error) {
  //   console.error("Unable to connect to the database:", error);
  //   process.exit(1);
  // }

  await sequelize.sync({ alter: true });
}

async function initMiddlewares() {
  const cors = require("cors");
  app.use(cors());
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, "assets")));

  let { Eta } = require("eta");
  let eta = new Eta({ views: path.join(__dirname, "views"), cache: false });
  app.use(function (req, res, next) {
    res.render = function (view, data) {
      res.send(eta.render(view, data));
    };
    next();
  });
}

function initControllers() {
  require("./controllers/website.controller.js")(app);
  require("./controllers/projects.controller.js")(app);
}

function initServer() {
  app.listen(process.env.PORT, function () {
    console.log("listening on port " + process.env.PORT);
  });
}

async function init() {
  await initDatabase();
  await bootstrap();
  initMiddlewares();
  initControllers();
  initServer();
}
init();

async function bootstrap() {
  return;
  const { fakerFR: faker } = require("@faker-js/faker");
  const { Project, User, Task } = require("./models/index.js");

  let projects = await Project.findAll();
  let users = await User.findAll();

  // Créer des projets si moins de 3 projets existent
  if (projects.length < 3) {
    for (let i = 0; i < 3; i++) {
      await Project.create({
        name: faker.commerce.productName(),
        startDate: faker.date.past(),
        endDate: faker.date.future(),
        taskCount: faker.number.int({ min: 1, max: 10 }),
      });
    }
  }

  // Créer des utilisateurs si moins de 5 utilisateurs existent
  if (users.length < 5) {
    for (let i = 0; i < 5; i++) {
      await User.create({
        name: faker.name.firstName(),
        email: faker.internet.email(),
      });
    }
  }

  // Créer des tâches si moins de 20 tâches existent
  let tasks = await Task.findAll();
  if (tasks.length < 20) {
    for (let i = 0; i < 20; i++) {
      await Task.create({
        name: faker.commerce.taskName(),
        description: faker.commerce.taskDescription(),
        id_user: faker.number.int({ min: 1, max: users.length }),
        id_project: faker.number.int({ min: 1, max: projects.length }),
      });
    }
  }
}
