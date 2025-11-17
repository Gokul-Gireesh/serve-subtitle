const usersStorage = require("../storages/usersStorage");
const { html } = require("../xjs");
const { index, createUser, updateUser } = require("../views/views");
const { body, validationResult, matchedData } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("firstName").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
  body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
  body("email").isEmail().withMessage("Invalid email"),
  body("age").optional().isInt({ min: 18, max: 120 })
    .withMessage("Age must be between 18 and 120"),
  body("bio").optional().isLength({ max: 200 })
    .withMessage("Bio cannot exceed 200 characters"),
];

// GET — list users
exports.usersListGet = (req, res) => {
  res.send(
    html.render(index, {
      title: "User list",
      users: usersStorage.getUsers(),
    })
  );
};

// GET — create form
exports.usersCreateGet = (req, res) => {
  res.send(
    html.render(createUser, {
      title: "Create user",
    })
  );
};

// POST — create user
exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(
        html.render(createUser, {
          title: "Create user",
          errors: errors.array(),
        })
      );
    }

    const { firstName, lastName } = matchedData(req);
    usersStorage.addUser({ firstName, lastName });
    res.redirect("/");
  }
];

// GET — update form
exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.send(
    html.render(updateUser, {
      title: "Update user",
      user,
    })
  );
};

// POST — update user
exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(
        html.render(updateUser, {
          title: "Update user",
          user,
          errors: errors.array(),
        })
      );
    }

    const { firstName, lastName } = matchedData(req);
    usersStorage.updateUser(req.params.id, { firstName, lastName });
    res.redirect("/");
  }
];

// POST — delete user
exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

// GET - search user
exports.usersSearchGet = (req, res) => {
  const { name, email } = req.query;
  const results = usersStorage.searchUsers({ name, email });
  res.send(html.render(searchView, { title: "Search Results", results }));
};