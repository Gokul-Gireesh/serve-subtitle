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