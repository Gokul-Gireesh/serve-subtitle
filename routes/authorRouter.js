const { Router } = require("express");
const { getAuthorById } = require('../controllers/authorController');

const authorRouter = Router();

authorRouter.get("/:authorId", getAuthorById);

authorRouter.get("/", (req, res) => res.send("All authors"));

module.exports = authorRouter;
