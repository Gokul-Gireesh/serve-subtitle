const { Router } = require("express");

const bookRouter = Router();

authorRouter.get("/", (req, res) => res.send("All books"));
authorRouter.get("/:bookId", (req, res) => {
  const { bookId } = req.params;
  res.send(`Author ID: ${bookId}`);
});

module.exports = bookRouter;
