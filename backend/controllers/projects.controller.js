const { Project, Task, User } = require("../models");

module.exports = function (app) {
  console.log("text");
  app.get("/v1/projects", async function (req, res) {
    const projects = await Project.findAll();
    res.json({ data: projects, error: null });
  });

  app.get("/v1/projects/:id", async function (req, res) {
    const project = await Project.findByPk(req.params.id, {
      include: [""],
    });
    if (!product) return res.json({ error: "not_found" });
    res.json({ data: project });
  });

  app.post("/v1/projects", async function (req, res) {
    const project = await Project.create(req.body);
    if (!project) return res.json({ error: "not_created" });
    res.json({ data: project });
  });

  app.put("/v1/projects/:id", async function (req, res) {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.json({ error: "not_found" });
    await project.update(req.body);
    res.json({ data: project, error });
  });

  app.delete("/v1/projects/:id", async function (req, res) {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.json({ error: "not_found" });
    await project.destroy();
    res.json({ data: project, error });
  });
};
