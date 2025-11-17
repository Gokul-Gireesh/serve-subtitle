const { Router } = require("express");

const indexRouter = Router();

authorRouter.get("/", (req, res) => res.send("All indexes"));
authorRouter.get("/:indexId", (req, res) => {
  const { indexId } = req.params;
  res.send(`Author ID: ${indexId}`);
});

module.exports = indexRouter;
