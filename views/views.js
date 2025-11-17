import { html } from "@gokul-gireesh/xjs";

export function errors() {
  const errors = html.useContext("errors"); 
  if (!errors || errors.length === 0) return html``;

  return html`
    <ul>
      ${errors.map(error => html`<li>${error.msg}</li>`)}
    </ul>
  `;
});

export function index() {
  const locals = html.useContext();

  return html`
  <!DOCTYPE html>
  <html>
  <head>
    <title>${locals.title}</title>
  </head>
  <body>
    <h1>${locals.title}</h1>
    <ul>
      ${locals.users
        ? locals.users.map(user => html`
          <li>
            ID: ${user.id}, Name: ${user.firstName} ${user.lastName}
            <a href="/${user.id}/update">Update</a>
            <form 
              action="/${user.id}/delete" 
              method="POST" 
              style="display:inline;"
              onsubmit="return confirm('Are you sure you want to delete this user?');"
            >
              <button type="submit">Delete</button>
            </form>
          </li>
        `)
        : ""}
    </ul>
    <a href="/create">Create a user</a>
  </body>
  </html>`;
}

export function createUser() {
  const locals = html.useContext();
  return html`
  <!DOCTYPE html>
  <html>
    <head>
      <title>${locals.title}</title>
    </head>
  <body>
    <h1>${locals.title}</h1>
    ${html.use(errors)}
    <form action="/create" method="POST">
      <label for="firstName">First Name: </label>
      <input type="text" name="firstName" id="firstName" required>
      <label for="lastName">Last Name: </label>
      <input type="text" name="lastName" id="lastName" required>
      <button type="submit">Submit</button>
    </form>
    <a href="/">Back to home</a>
  </body>
  </html>`;
}

export function updateUser() {
  const locals = html.useContext();
  const user = locals.user;

  return html`
  <!DOCTYPE html>
  <html>
    <head>
      <title>${locals.title}</title>
    </head>
  <body>
    <h1>${locals.title}</h1>
    ${html.use(errors)}
    <form action="/${user.id}/update" method="POST">
      <input type="text" name="firstName" value="${user.firstName}" required>
      <input type="text" name="lastName" value="${user.lastName}" required>
      <button type="submit">Update User</button>
    </form>
    <a href="/">Back to home</a>
  </body>
  </html>`;
}