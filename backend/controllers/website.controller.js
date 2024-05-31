const { Project, Task, User } = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index.eta", { menu: "index" });
  });

  app.get("/projets", async function (req, res) {
    let types = await Project.findAll({
      order: [["name", "ASC"]],
      include: ["projects"],
    });
    let where = {};
    if (req.query.type) where.typeId = req.query.type;
    let projects = await Project.findAll({
      where,
      order: [["name", "ASC"]],
    });

    res.render("projects.eta", { projects, types, menu: "nos-projets" });
  });

  app.get("/projets/:id", async function (req, res) {
    let project = await Project.findOne({
      where: { id: req.params.id },
    });
    if (!project) res.redirect("/projets");
    res.render("project-details.eta", { project, menu: "projets" });
  });
};
